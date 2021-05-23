<template>
  <div>
    <h1 class="text-center display-2 primary--text text-accent-3">
      Apply to be a tutor!
    </h1>
    <v-form>
      <v-container style="width: 50%">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              ref="firstName"
              v-model="firstName"
              dense
              :rules="[() => !!firstName || 'This field is required']"
              label="First Name"
              outlined
              placeholder="asd"
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              ref="lastName"
              v-model="lastName"
              dense
              :rules="[() => !!lastName || 'This field is required']"
              label="Last Name"
              outlined
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-autocomplete
              ref="grade"
              v-model="grade"
              dense
              :rules="[() => !!grade || 'This field is required']"
              :items="grades"
              label="Select Grade"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-select
              dense
              v-model="currentClasses"
              :items="classes"
              :menu-props="{ maxHeight: '400' }"
              label="Choose your classes"
              multiple
              chips
              hint="Must have received a grade of 90% or higher both semeseters"
              persistent-hint
              placeholder="asd"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-text-field
              ref="maxTut"
              v-model.number="maxTut"
              :step="1"
              dense
              :rules="[() => !!maxTut || 'This field is required']"
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
          >
          </v-text-field>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="primary" @click="onSubmit"> Submit </v-btn>
        </v-row>
      </v-container>
    </v-form>

    <p v-if="errors.length">
      <strong>Please correct the following error(s):</strong>
    </p>

    <ul>
      <li v-for="error in errors" :key="error.id">{{ error }}</li>
    </ul>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    firstName: null,
    lastName: null,
    email: firebase.auth().currentUser.email,
    grade: null,
    grades: ["9", "10", "11", "12"],
    maxNumOfTutees: null,
    possibleNumOfTutees: ["1", "2", "3", "4", "5"],
    currentClasses: [],
    maxTut: null,
    desc: null,
    classes: [
      "AP Biology",
      "AP Chemistry",
      "AP Computer Science A",
      "AP Physics",
      "AP Spanish",
      "AP Chinese",
      "AP Statistics",
      "AP Calculus AB",
      "AP Calculus BC",
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
    selectedDays: [],
    errors: [],
    photoURL: null,
  }),
  methods: {
    onSubmit() {
      this.checkForm();
      console.log(
        "submit",
        this.firstName + " " + this.lastName,
        this.currentClasses,
        this.errors
      );
      console.log("submit2", this.errors);
      if (this.errors.length == 0) {
        firebase
          .firestore()
          .collection("Our Tutors")
          .doc(firebase.auth().currentUser.uid)
          .set({
            classes: this.currentClasses,
            name: this.firstName + " " + this.lastName,
            grade: this.grade,
            maxTut: this.maxTut,
            days: this.selectedDays,
            desc: this.desc,
            photoURL: firebase.auth().currentUser.photoURL,
          });
        this.$router.push("/OurTutors");
      }
    },
    // eslint-disable-next-line no-unused-vars
    checkForm() {
      this.errors = [];
      if (!this.firstName) {
        this.errors.push("First name required.");
      }
      if (!this.lastName) {
        this.errors.push("Last name required.");
      }
      if (!this.grade) {
        this.errors.push("Grade level required.");
      }
      if (this.currentClasses.length == 0) {
        this.errors.push("Please select at least one class.");
      }
    },
  },
};
</script>
