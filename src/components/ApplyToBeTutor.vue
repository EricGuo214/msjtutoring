<template>
  <div>
    <h1 class="text-center display-2 primary--text text-accent-3">
      Apply To Be A Tutor!
    </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container style="width: 50%">
        <v-row align="center" justify="center">
          <v-col cols="12" md="5" class="mx-auto">
            <v-text-field
              v-model="firstName"
              dense
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => (v && v.indexOf(' ') == -1) || 'No spaces',
              ]"
              label="First Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="lastName"
              dense
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => (v && v.indexOf(' ') == -1) || 'No spaces',
              ]"
              label="Last Name"
              outlined
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col md="5">
            <v-autocomplete
              v-model="grade"
              dense
              :rules="[(v) => !!v || 'This field is required']"
              :items="grades"
              label="Select Grade"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-combobox
              v-model="selectedClasses"
              dense
              :rules="[(v) => !!v || 'This field is required']"
              :items="classes"
              :menu-props="{ maxHeight: '400' }"
              label="Choose your classes or create your own"
              multiple
              chips
              hint="Must have received a grade of 90% or higher both semeseters"
              persistent-hint
              required
            >
              <template v-slot:item="data">
                <template>
                  <v-list-item-content v-text="data.item"></v-list-item-content>
                </template>
              </template>
            </v-combobox>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model.number="maxTut"
              type="number"
              dense
              :step="1"
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => v < 10 || 'Must be less than 10',
              ]"
              label="Maxiumum students"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              dense
              v-model="selectedDays"
              :items="days"
              :menu-props="{ maxHeight: '400' }"
              :rules="[(v) => !!v || 'This field is required']"
              label="Available times"
              multiple
              chips
            ></v-select>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="desc"
            label="Enter a short description for tutees to see"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-row>

        <h2>Contact Information</h2>
        <v-list>
          <v-list-item
            v-for="tile in tiles"
            :key="tile.title"
            @click="sheet = false"
          >
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img :src="`${tile.img}`" :alt="tile.title" />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                :label="tile.label"
                dense
                v-model="tile.value"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-row align="center" justify="center">
          <v-btn color="primary" @click="submit" :disabled="!valid">
            Submit
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    valid: true,
    firstName: null,
    lastName: null,
    email: firebase.auth().currentUser.email,
    grade: null,
    grades: ["9", "10", "11", "12"],
    selectedClasses: [],
    maxTut: null,
    desc: null,
    addclass: "",
    classes: [
      { header: "Sciences" },
      "AP Biology",
      "AP Chemistry",
      "AP Computer Science A",
      "AP Physics 1",
      "AP Physics C",
      "Physics",
      "Physics in the Universe",
      "Biology",
      "Chemistry",
      "Living Earth",
      { divider: true },

      { header: "Languages" },
      "AP Spanish",
      "AP Chinese",
      { divider: true },

      { header: "Maths" },
      "AP Statistics",
      "AP Calculus AB",
      "AP Calculus BC",
      "Calculus",
      "Precalculus",
      "Algebra 2/Trig",
      "Algebra 2",
      "Trig",
      "Geometry",
    ],

    days: [
      "Monday",
      "Tuesday",
      "Wednesday",
      "Thursday",
      "Friday",
      "Saturday",
      "Sunday",
    ],
    selectedDays: null,
    photoURL: null,
    sheet: false,
    tiles: [
      {
        img: "https://img-authors.flaticon.com/google.jpg",
        label: "cooldude@gmail.com",
        value: firebase.auth().currentUser.email,
      },
      {
        img:
          "https://i.pinimg.com/736x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg",
        label: "@cooldude224 (optional)",
        value: "",
      },
      {
        img:
          "https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png",
        label: "Cool Dude (optional)",
        value: "",
      },
    ],
  }),
  methods: {
    submit() {
      if (this.$refs.form.validate()) {
        firebase
          .firestore()
          .collection("OurTutors")
          .doc(firebase.auth().currentUser.email)
          .set({
            classes: this.selectedClasses,
            name: this.firstName + " " + this.lastName,
            fName: this.firstName,
            lName: this.lastName,
            grade: this.grade,
            maxTut: this.maxTut,
            days: this.selectedDays,
            desc: this.desc,
            photoURL: firebase.auth().currentUser.photoURL,
            contactInfo: this.tiles.map((t) => t.value),
          });
        this.$router.push("/OurTutors");
      }
    },
  },
};
</script>
