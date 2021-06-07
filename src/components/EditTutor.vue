<template>
  <div>
    <h1 class="text-center display-2 primary--text text-accent-3">
      Edit Profile
    </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container style="width: 50%">
        <v-row align="center" justify="center">
          <v-col cols="12" md="5" class="mx-auto">
            <v-text-field
              v-model="info.fName"
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
              v-model="info.lName"
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
              v-model="info.grade"
              dense
              :rules="[(v) => !!v || 'This field is required']"
              :items="grades"
              label="Select Grade"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-combobox
              v-model="info.classes"
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
              v-model.number="info.maxTut"
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
              v-model="info.day"
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
            v-model="info.desc"
            label="Enter a short description for tutees to see"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-row>

        <h2>Contact Information</h2>
        <v-list>
          <v-list-item
            v-for="(tile,i) in tiles"
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
                v-model="info.contactInfo[i]"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-row align="center" justify="center">
          <v-btn color="primary" @click="onSubmit"> Save </v-btn>
          <v-btn color="primary" to=/OurTutors> Back </v-btn>
        </v-row>
        
      </v-container>
    </v-form>
  </div>
</template>


<script>
import firebase from "firebase";
export default {
  data() {
    return {
      valid: true,
      tID: this.$route.params.id,
      info: {},
      
      grades: ["9", "10", "11", "12"],

       classes: [
      { header: "Sciences" },
      "AP Biology",
      "AP Chemistry",
      "AP Computer Science A",
      "AP Physics",
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
       tiles: [
      {
        img: "https://img-authors.flaticon.com/google.jpg",
        label: "cooldude@gmail.com",
        value: this.email,
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
    };
  },
  methods: {
    onSubmit() {
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(firebase.auth().currentUser.email)
        .update(this.info);
     
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        
        firebase
          .firestore()
          .collection("Our Tutors")
          .doc(this.tID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.info = doc.data();
            }
          });
      }
    });
  },
};
</script>
