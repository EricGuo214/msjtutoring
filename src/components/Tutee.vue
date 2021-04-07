<template>
  <div id="create-form">
    <h1>Sign up to get help and a tutor!</h1>
    <form>
      <h2>First Name</h2>
      <v-text-field
        ref="form.firstName"
        v-model="form.firstName"
        dense
        :rules="[() => !!form.firstName || 'This field is required']"
        label="Enter your first name"
        outlined
        shaped
        required
        @keydown.enter="onAddItem"
      ></v-text-field>
      <h2>Last Name</h2>
      <v-text-field
        ref="form.lastName"
        v-model="form.lastName"
        dense
        :rules="[() => !!form.lastName || 'This field is required']"
        label="Enter your last name"
        outlined
        shaped
        required
        @keydown.enter="onAddItem"
      ></v-text-field>
      <h2>Grade</h2>
      <v-autocomplete
        ref="form.grade"
        v-model="form.grade"
        dense
        :rules="[() => !!form.grade || 'This field is required']"
        :items="grades"
        label="Enter or select your grade (9, 10, 11, 12)"
        outlined
        shaped
        required
      ></v-autocomplete>
      <h2>Choose which class(es) you would like to tutor for</h2>
      // create list of classes or fill in the blank classes which leads to all forms related to this class
      <v-row>
        <h3 class="my-4"></h3>
      </v-row>
      <v-btn color="primary" @click="submit"> Submit </v-btn>
    </form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    firstName: null,
    lastName: null,
    grades: ["9", "10", "11", "12"],
    purpose: null,
    classes: null,
    formHasErrors: false,
  }),
  computed: {
    form() {
      return {
        firstName: this.firstName,
        lastName: this.lastName,
        grade: this.grade,
        purpose: this.prupose,
        classes: this.classes
      };
    },
  },
  methods: {
      onSubmitForm() {
          firebase
          .firestore()

      }
  }
};
</script>

