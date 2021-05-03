<template>
  <div id="create-form">
    <h1>Apply to be a tutor!</h1>
    <h2>
      Being a tutor at MSJ Tutor offers you hands on experience to leadership
      and teaching. Sign up today!
    </h2>
    <!-- <v-radio-group v-model="purpose">
      <v-radio label="tutor" value="tutor"></v-radio>
      <v-radio label="tutee" value="tutee"></v-radio>
    </v-radio-group> -->
    <form>
      <h2>First Name</h2>
      <v-text-field
        ref="firstName"
        v-model="firstName"
        dense
        :rules="[() => !!firstName || 'This field is required']"
        label="Enter your first name"
        outlined
        shaped
        required
        @keydown.enter="onAddItem"
      ></v-text-field>
      <h2>Last Name</h2>
      <v-text-field
        ref="lastName"
        v-model="lastName"
        dense
        :rules="[() => !!lastName || 'This field is required']"
        label="Enter your last name"
        outlined
        shaped
        required
        @keydown.enter="onAddItem"
      ></v-text-field>
      <h2>Grade</h2>
      <v-autocomplete
        ref="grade"
        v-model="grade"
        dense
        :rules="[() => !!grade || 'This field is required']"
        :items="grades"
        label="Enter or select your grade (9, 10, 11, 12)"
        outlined
        shaped
        required
      ></v-autocomplete>
      <h2>Choose which class(es) you would like to be a mentor in:</h2>
      <v-select
        v-model="currentClasses"
        :items="classes"
        :menu-props="{ maxHeight: '400' }"
        label="Choose your classes"
        multiple
        chips
        hint="Must have received a grade of 90% or higher both semeseters"
        persistent-hint
      ></v-select>
      <v-row>
        <h3 class="my-4"></h3>
      </v-row>
      <v-btn color="primary" @click="onSubmit"> Submit </v-btn>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    firstName: null,
    lastName: null,
    grade: null,
    grades: ["9", "10", "11", "12"],
    currentClasses: [],
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
    formHasErrors: false,
  }),
  methods: {
    onSubmit() {
      console.log("submit", this.firstName + " " + this.lastName, this.currentClasses);
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(this.firstName + " " + this.lastName)
        .set({ classes: this.currentClasses });
    },
  },
};
</script>
