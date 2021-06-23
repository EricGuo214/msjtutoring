<template>
  <div>
    <h1>Your Inbox</h1>
    <h2>Your tutor(s) are shown below!</h2>
    <!-- {{ tutors }} -->
    <!-- <v-btn @click="test"></v-btn> -->
    <v-container>
      <v-row>
        <v-col v-for="t in tutors" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.tutor.name }}
            </v-card-title>
            <v-card-text>
              Interested class:
              <div class="primary--text mb -2">{{ t.classForTutee }}</div>
            </v-card-text>
            <v-card-text>
              Contact information:
              <div class="primary--text mb-2">{{ t.tutor.email }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-spacer> </v-spacer>
    <h2>Your tutees are shown below!</h2>
    <!-- {{ tutors }} -->
    <!-- <v-btn @click="test"></v-btn> -->
    <v-container>
      <v-row>
        <v-col v-for="t in tutees" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.tutee.name }}
            </v-card-title>
            <v-card-text>
              Interested class:
              <div class="primary--text mb -2">{{ t.tutorsClass }}</div>
            </v-card-text>
            <v-card-text>
              Contact information:
              <div class="primary--text mb-2">{{ t.tutee.email }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tutors: [],
      tutorsInfo: [],
      tutees: [],
      tuteesInfo: [],
      userTutee: null,
      userTutor: null,
    };
  },
  created() {
    // to see your tutors (all your tutors -> tutors[])
    firebase
      .firestore()
      .collection("Tutees")
      .doc(firebase.auth().currentUser.email)
      .collection("classes")
      .onSnapshot((querySnapshot) => {
        this.tutors = [];
        querySnapshot.forEach((doc) => {
          console.log(doc.data());
          var tutor = doc.data();
          tutor.classForTutee = doc.id;
          this.tutors.push(tutor);
          this.getTutorInfo(tutor, this.tutorsInfo);
        });
      });
    // to see your tutees (all your tutees -> tutees[])
    firebase
      .firestore()
      .collection("OurTutors")
      .doc(firebase.auth().currentUser.email)
      .collection("classes")
      .onSnapshot((querySnapshot) => {
        var fArray = [];
        querySnapshot.forEach((doc) => {
          let pair = doc.data();
          pair.id = doc.id;
          firebase
            .firestore()
            .collection("OurTutors")
            .doc(firebase.auth().currentUser.email)
            .collection("classes")
            .doc(doc.id)
            .collection("correspondingTutees")
            .get()
            .then((querySnapshot2) => {
              pair.classes = [];
              querySnapshot2.forEach((doc2) => {
                let cls = doc2.data();
                console.log(cls);
                pair.classes.push(cls);
              });
              fArray.push(pair);
            });
          this.tutees.push(pair);
          this.getTuteeInfo(pair, this.tuteesInfo);
        });
      });

    // this.tutees = [];
    // querySnapshot.forEach((doc) => {
    //   var tutee = doc.data();
    //   tutee.tutorsClass = doc.id;
    //   this.tutees.push(tutee);
  },
  methods: {
    getTuteeInfo(emailOfTutee, tuteesInfo) {
      this.userTutee = null;
      firebase
        .firestore()
        .collection("Tutees")
        .doc(emailOfTutee)
        .get()
        .then((doc) => {
          tuteesInfo.push(doc.data());
        });
    },
    getTutorInfo(emailOfTutor, tutorsInfo) {
      firebase
        .firestore()
        .collection("OurTutors")
        .doc(emailOfTutor)
        .get()
        .then((doc) => {
          tutorsInfo.push(doc.data());
        });
    },
  },
};
</script>
