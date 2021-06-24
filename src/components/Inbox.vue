<template>
  <div>
    <h1>Your Inbox</h1>
    <h2>Your tutor(s) are shown below!</h2>
    <!-- {{ classes }} -->
    <!-- <v-btn @click="test"></v-btn> -->
    {{ classes }}
    <!-- {{tutorsInfo}} -->
    <v-container>
      <v-row>
        <v-col v-for="t in classes" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.tutorInfo.name }}
            </v-card-title>
            <v-card-text>
              Interested class:
              <div class="primary--text mb -2">{{ t.name }}</div>
            </v-card-text>
            <v-card-text>
              Contact information:
              <div class="primary--text mb-2">{{ t.tutorInfo.email }}</div>
            </v-card-text>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <v-spacer> </v-spacer>
    <h2>Your tutees are shown below!</h2>
    {{ tuteesInfo }}
    <!-- <v-btn @click="test"></v-btn> -->
    <v-container>
      <v-row>
        <v-col v-for="t in tuteesInfo" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.tuteeInfo.name }}
            </v-card-title>
            <v-card-text>
              Interested class:
              <div class="primary--text mb -2">{{ t.name }}</div>
            </v-card-text>
            <v-card-text>
              Contact information:
              <div class="primary--text mb-2">{{ t.tuteeInfo.email }}</div>
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
      classes: [],
      tutees: [],
      tuteesInfo: [],
    };
  },
  created() {
    // to see your classes (all your classes -> classes[])
    firebase
      .firestore()
      .collection("Tutees")
      .doc(firebase.auth().currentUser.email)
      .collection("Classes")
      .onSnapshot((querySnapshot) => {
        this.classes = [];
        querySnapshot.forEach((doc) => {
          var cls = doc.data();
          console.log("class", cls);
          console.log("is it paired?", cls.name, cls.p);
          if (cls.p == true) {
            console.log(doc.name, "is paired = true");
            // this.classes.push(cls);
            this.getTutorInfo(cls.tutor.tutorEmail, cls);
          }
        });
      });
    // to see your tutees (all your tutees -> tutees[])
    firebase
      .firestore()
      .collection("OurTutors")
      .doc(firebase.auth().currentUser.email)
      .collection("Classes")
      .onSnapshot((querySnapshot) => {
        this.tuteesInfo = [];
        querySnapshot.forEach((doc) => {
          var cls = doc.data();
          console.log("class", cls);
          if (cls.tutees !== undefined) {
            console.log("has tutee ", cls);
            this.getTuteeInfo(cls.tutees, cls);
          }
        });
      });

    // this.tutees = [];
    // querySnapshot.forEach((doc) => {
    //   var tutee = doc.data();
    //   tutee.tutorsClass = doc.id;
    //   this.tutees.push(tutee);
  },
  methods: {
    getTuteeInfo(emailOfTutees, cls) {
      emailOfTutees.forEach((tuteeEmail) =>
        firebase
          .firestore()
          .collection("Tutees")
          .doc(tuteeEmail.tuteeEmail)
          .get()
          .then((doc) => {
            cls.tuteeInfo = doc.data();
            this.tuteesInfo.push(cls);
          })
      );
    },
    getTutorInfo(emailOfTutor, cls) {
      firebase
        .firestore()
        .collection("OurTutors")
        .doc(emailOfTutor)
        .get()
        .then((doc) => {
          console.log("tutorInfo", doc.data());
          cls.tutorInfo = doc.data();
          // tutorsInfo.push(doc.data());
          this.classes.push(cls);
          console.log("classes after tutorInfo", this.classes);
        });
    },
  },
};
</script>
