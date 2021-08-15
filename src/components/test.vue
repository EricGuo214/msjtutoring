<template>
  <body>
    <v-combobox
      return-object
      v-model="selectedClasses"
      dense
      :items="classes"
      item-text="name"
      :rules="[required]"
      label="Select the classes you need help in"
      multiple
      chips
      hint="Or type in a class if it doesn't exsist"
      persistent-hint
      required
    >
    </v-combobox>
    <v-btn @click="test">test</v-btn>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    selectedClasses: [],

    classes: [
      { header: "Sciences" },
      { divider: true },
      { name: "AP Biology" },
      { name: "AP Chemistry" },
      { name: "AP Physics 1" },
      { name: "AP Physics C" },
      { name: "CP Physics" },
      { name: "AP Environmental Science" },
      { name: "Physics in the Universe" },
      { name: "Biology" },
      { name: "Chemistry" },
      { name: "Living Earth" },
      { name: "Anatomy Physiology" },
      { name: "Chemical Technology" },
      { divider: true },

      { header: "Maths" },
      { divider: true },
      { name: "AP Statistics" },
      { name: "AP Computer Science A" },
      { name: "AP Calculus AB" },
      { name: "AP Calculus BC" },
      { name: "CP Calculus" },
      { name: "Precalculus" },
      { name: "Algebra 2 | Trig" },
      { name: "Algebra 2" },
      { name: "Trigonometry" },
      { name: "Geometry" },
      { name: "Trig" },
      { name: "Algebra 1" },
      { name: "Discrete Math" },
      { name: "Intro to C++" },
      { name: "Multivariable" },
      { name: "Linear Algebra" },
    ],
  }),

  created() {
    var db = firebase.firestore();
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        const userEmail = firebase.auth().currentUser.email;
        db.collection("OurTutors")
          .doc(userEmail)
          .get()
          .then((doc) => {
            this.tutor = doc.data();
          });
      }
    });
  },

  methods: {
    test() {
      this.classes[2].disabled = true;
      console.log(this.classes[2]);
    },

    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "Required.";
    },
  },
  computed: {
    isValid() {
      return this.name != "" && this.selectedClasses.length != 0;
    },
  },
};
</script>
