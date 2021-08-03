<template>
  <body>
    <h1>Your Profile</h1>
    <v-col
      v-if="this.myClasses.length >= 1"
      cols="12"
      sm="4"
      class="justify-center"
    >
      <v-card max-width="450" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ this.tutor.fName }} {{ this.tutor.lName }}
            </v-list-item-title>
            <v-list-item-subtitle
              ><h3>{{ this.tutor.desc }}</h3></v-list-item-subtitle
            >
          </v-list-item-content>

<<<<<<< Updated upstream
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
=======
          <v-list-item-avatar tile size="100" color="grey">
            <v-img :src="this.tutor.photoURL"> </v-img
          ></v-list-item-avatar>
        </v-list-item>
        <v-card-text>
          <h4>Qualified classes:</h4>
          <v-list-item v-for="(cls, i) in this.myClasses" :key="i">
            <v-list-item-content v-text="cls"></v-list-item-content>
          </v-list-item>

          <h4>Availible spaces:</h4>
          <div class="primary--text mb-2" bold>{{ this.tutor.maxTut }}</div>
        </v-card-text>
      </v-card>
      <br />
      <div class="my-2">
        <v-btn color="primary" to="/UpdateTutor">
          Update Tutor Information
        </v-btn>
      </div>
      <br />
      <br />
    </v-col>

    <v-col
      v-if="this.tuteeClasses.length >= 1"
      cols="12"
      sm="4"
      class="justify-center"
    >
      <v-card max-width="450" outlined>
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="text-h5 mb-1">
              {{ this.tutee.name }}
            </v-list-item-title>
            <v-list-item-subtitle
              ><h3>{{ this.tutee.notes }}</h3></v-list-item-subtitle
            >
          </v-list-item-content>

          <v-list-item-avatar tile size="100" color="grey">
            <v-img :src="this.tutee.photoURL"> </v-img
          ></v-list-item-avatar>
        </v-list-item>
        <v-card-text>
          <h4>Registered classes:</h4>
          <v-list-item v-for="(cls, i) in this.tuteeClasses" :key="i">
            <v-list-item-content v-text="cls"></v-list-item-content>
          </v-list-item>
        </v-card-text>
      </v-card>
      <br />
      <div class="my-2">
        <v-btn color="primary" to="/UpdateTutee">
          Update Tutee Information
        </v-btn>
      </div>
      <br />
      <br />
    </v-col>
>>>>>>> Stashed changes
  </body>
</template>
<script>
import firebase from "firebase";

export default {
  data: () => ({
    selectedClasses: [],
<<<<<<< Updated upstream
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
=======
    tutor: "",
    myClasses: [],
    tutee: "",
    tuteeClasses: []
  }),

  created() {
    const db = firebase.firestore();
    firebase.auth().onAuthStateChanged(user => {
>>>>>>> Stashed changes
      if (user) {
        const userEmail = firebase.auth().currentUser.email;
        db.collection("OurTutors")
          .doc(userEmail)
          .get()
<<<<<<< Updated upstream
          .then((doc) => {
            this.tutor = doc.data();
          });
=======
          .then(doc => {
            this.tutor = doc.data();
          });

        db.collection("OurTutors")
          .doc(userEmail)
          .collection("Classes")
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.myClasses.push(doc.data().name);
            });
          });

        db.collection("Tutees")
          .doc(userEmail)
          .get()
          .then(doc => {
            this.tutee = doc.data();
          });

        db.collection("Tutees")
          .doc(userEmail)
          .collection("Classes")
          .onSnapshot(querySnapshot => {
            querySnapshot.forEach(doc => {
              this.tuteeClasses.push(doc.data().name);
            });
          });
>>>>>>> Stashed changes
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
<<<<<<< Updated upstream
    },
=======
    }
>>>>>>> Stashed changes
  },
  computed: {
    isValid() {
      return this.name != "" && this.selectedClasses.length != 0;
<<<<<<< Updated upstream
    },
  },
=======
    }
  }
>>>>>>> Stashed changes
};
</script>

<style scoped>
.half {
  text-align: center;
  margin: auto;
}
.color {
  text-color: #000000;
}
</style>
