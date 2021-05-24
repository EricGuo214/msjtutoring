<template>
  <div>
    <h1>Your Inbox</h1>
    <h2>Interested tutees will show up here</h2>
    {{ interested }}
    <v-btn @click="test"></v-btn>
    <v-container>
      <v-row>
        <v-col v-for="t in interested" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.firstName + " " + t.lastName }}
            </v-card-title>
            <v-card-text>
              Contact information:
              <div class="primary--text mb-2">{{ t.userEmail }}</div>
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
      interested: [],
    };
  },
  created() {
    firebase
      .firestore()
      .collection("Our Tutors")
      .doc(firebase.auth().currentUser.email)
      .collection("Interested Tutees")
      .onSnapshot((querySnapshot) => {
        this.interested = [];
        querySnapshot.forEach((doc) => {
          console.log(doc);
          var tutee = doc.data();
          tutee.id = doc.id;
          this.interested.push(tutee);
        });
      });
  },
  methods: {
    test() {
      console.log(firebase.auth().currentUser.uid);
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(firebase.auth().currentUser.uid)
        .get()
        .then((doc) => {
            if(doc.exists) {
                console.log("exists, data: ", doc.data);
            }else{
                console.log("does not exist");
            }
        });
        // .collection("Interested Tutees")
        // .get()
        // .then((querySnapshot) => {
        //   this.interested = [];
        //   querySnapshot.forEach((doc) => {
        //     console.log(doc);
        //     var tutee = doc.data();
        //     tutee.id = doc.id;
        //     this.interested.push(tutee);
        //   });
        // });
    },
  },
};
</script>
