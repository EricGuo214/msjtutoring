<template>
  <body>
    <h1>Your Profile</h1>

    <v-container class="half">
      <v-row>
        <div class="text-center">
          <div class="my-2">
            <v-btn color="primary" to="/UpdateTutor">
              Update Tutor Information
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="primary" to="/UpdateTutee">
              Update Tutee Information
            </v-btn>
          </div>
        </div>
        <p>{{ this.tutor.fName }}</p>
      </v-row>
    </v-container>
  </body>
</template>
<script>
import firebase from "firebase";

export default {
  data: () => ({
    selectedClasses: [],
    tutor: null,

    classes: [
      { header: "Sciences" },
      { divider: true },
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

      { header: "Languages" },
      { divider: true },

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

<style scoped>
.half {
  text-align: center;
  margin: auto;
}
</style>
