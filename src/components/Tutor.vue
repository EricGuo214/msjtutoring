<template>
  <div id="create-form">
    <h1>I am applying to be a :</h1>
    <v-radio-group v-model="purpose">
      <v-radio label="tutor" value="tutor"></v-radio>
      <v-radio label="tutee" value="tutee"></v-radio>
    </v-radio-group>

    <h1>Sign up to {{ titlePrompt }}</h1>
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
      <h2>Choose which class(es) you would like {{ classPrompt }}</h2>
      // create list of classes or fill in the blank classes which leads to all
      forms related to this class
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
    purpose: "tutor",
    currentClasses: [],
    classes: ["class1", "class2"],
    formHasErrors: false,
  }),
  computed: {
    titlePrompt: function() {
      if (this.purpose == "tutor") {
        return "be a tutor!";
      } else {
        return "get a tutor!";
      }
    },
    classPrompt: function() {
      if (this.purpose == "tutor") {
        return "to tutor for:";
      } else {
        return "a tutor for:";
      }
    },
  },
  methods: {
    onSubmit() {
      console.log("submit", this.firstName, this.classes);
      let collectionName = "tutees";
      if (this.purpose == "tutor") {
        collectionName = "tutors";
      }
      firebase
        .firestore()
        .collection(collectionName)
        .doc(this.firstName)
        .set({ classes: this.classes });
    },
  },
};
</script>
