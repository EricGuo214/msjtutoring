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
            <v-text-field
              v-model.number="phonenumber"
              type="number"
              label="Phone Number"
              :rules="[(v) => !!v || 'This field is required']"
            >
            </v-text-field>
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
              required
            ></v-select>
          </v-col>
        </v-row>
        <v-row md="5">
          <v-autocomplete
            v-model="gender"
            dense
            :rules="[(v) => !!v || 'This field is required']"
            :items="genders"
            label="Gender"
            outlined
          ></v-autocomplete>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="desc"
            label="Enter a short description for tutees to see"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-row>
        <v-row align="center" justify="center">
          <v-combobox
            v-model="selectedClasses"
            dense
            :items="classes"
            item-text="name"
            :rules="[required]"
            label="What classes can you teach?"
            multiple
            chips
            hint="Select a class or type your own"
            persistent-hint
            :menu-props="{ maxHeight: '400' }"
            required
            return-object
          >
          </v-combobox>
        </v-row>
        <br />

        <v-row v-for="(cls, i) in selectedClasses" :key="i">
          <v-text-field
            :rules="[(v) => !!v || 'This field is required']"
            v-model="cls.teacher"
            :label="cls.name + ' Teacher'"
          >
          </v-text-field>
          <v-select
            style="width: 20%"
            v-model="cls.sem1"
            :items="academicGrades"
            :rules="[(v) => !!v || 'This field is required']"
            :label="cls.name + ' Sem 1 Grade'"
          ></v-select>
          <v-select
            style="width: 20%"
            v-model="cls.sem2"
            :items="academicGrades"
            :rules="[(v) => !!v || 'This field is required']"
            :label="cls.name + ' Sem 2 Grade'"
          ></v-select>
        </v-row>

        <br />

        <h2>Contact Information</h2>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img
                  :src="`https://img-authors.flaticon.com/google.jpg`"
                  :alt="'google logo'"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="email"
                :rules="emailRules"
                label="E-mail"
                required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img
                  :src="
                    `https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png`
                  "
                  :alt="'facebook logo'"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="facebook"
                :rules="[(v) => !!v || 'This field is required']"
                label="Facebook Username"
                required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img
                  :src="
                    `https://i.pinimg.com/736x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg`
                  "
                  :alt="'instagram logo'"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="instagram"
                label="Instagram handle (optional)"
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
    <!-- <v-btn color="primary" @click="test">
      test
    </v-btn> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    valid: true,
    firstName: null,
    lastName: null,
    grade: null,
    grades: ["9", "10", "11", "12"],
    selectedClasses: [],
    stringClasses: [],
    gender: null,
    genders: ["Male", "Female", "Other"],
    maxTut: null,
    desc: null,
    email: firebase.auth().currentUser.email,
    facebook: "",
    instagram: "",
    phonenumber: null,

    // valid: true,
    // firstName: "Rithwik",
    // lastName: "Vaidun",
    // grade: null,
    // grades: ["9", "10", "11", "12"],
    // selectedClasses: [],
    // stringClasses: [],
    // gender: "Male",
    // genders: ["Male", "Female", "Other"],
    // maxTut: 2,
    // desc: "I like to teach people in math",
    // email: firebase.auth().currentUser.email,
    // facebook: "Rvaidun",
    // instagram: "@riithwik",
    // phonenumber: 5105886879,

    classes: [
      { header: "Sciences" },
      { name: "AP Biology" },
      { name: "AP Chemistry" },
      { name: "AP Computer Science A" },
      { name: "AP Physics 1" },
      { name: "AP Physics C" },
      { name: "Physics" },
      { name: "Physics in the Universe" },
      { name: "Biology" },
      { name: "Chemistry" },
      { name: "Living Earth" },
      { divider: true },

      { header: "Languages" },
      { name: "AP Spanish" },
      { name: "AP Chinese" },
      { divider: true },

      { header: "Maths" },
      { name: "AP Statistics" },
      { name: "AP Calculus AB" },
      { name: "AP Calculus BC" },
      { name: "Calculus" },
      { name: "Precalculus" },
      { name: "Algebra 2/Trig" },
      { name: "Algebra 2" },
      { name: "Trig" },
      { name: "Geometry" },
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

    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    academicGrades: ["A", "B", "C", "D", "F"],
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
            gender: this.gender,
            maxTut: this.maxTut,
            days: this.selectedDays,
            desc: this.desc,
            photoURL: firebase.auth().currentUser.photoURL,
            email: this.email,
            facebook: this.facebook,
            instagram: this.instagram,
            phonenumber: this.phonenumber,
          });
        this.$router.push("/OurTutors");
      }
    },
    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "Required.";
    },
    test() {
      console.log(JSON.stringify(this.selectedClasses));
      this.stringClasses = this.selectedClasses.map((a) => a.name);
      console.log(this.stringClasses);
    },
  },
};
</script>
