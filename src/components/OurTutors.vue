<template>
  <div>
    <v-card>
      <v-text-field v-model="emailOfNewAdmin"></v-text-field>
      <v-btn @click="makeAdmin">test </v-btn>
    </v-card>
    <h1>Meet our tutors</h1>
    <v-container>
      <v-row>
        <v-col v-for="t in tutors" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.name }}
            </v-card-title>
            <v-img height="200px" :src="t.photoURL"> </v-img>
            <v-card-text>
              Qualified classes:
              <v-list-item v-for="(cls, i) in t.classes" :key="i">
                <v-list-item-title v-text="cls"></v-list-item-title>
                <v-btn
                  v-if="!wasAuthor(t)"
                  class="ma-2"
                  color="primary"
                  @click="
                    snackbar = true;
                    sendNotice(t.id, cls);
                  "
                >
                  <v-snackbar
                    v-model="snackbar"
                    :timeout="timeout"
                    rounded="pill"
                    top
                  >
                    You have successfully sent a request! Frequently check your
                    inbox for confirmation.
                    <template> Close </template>
                  </v-snackbar>
                  Sign up
                  <v-icon dark right>mdi-checkbox-marked-circle </v-icon>
                </v-btn>
              </v-list-item>
              Number of available spaces left:
              <div class="primary--text mb-2" bold>{{ t.maxTut }}</div>
            </v-card-text>
            <v-card-actions>
              <v-btn icon @click="t.show = !t.show">
                <v-icon>{{
                  t.show ? "mdi-chevron-up" : "mdi-chevron-down"
                }}</v-icon>
              </v-btn>
              <v-dialog>
                <template #activator="{ on: dialog }">
                  <v-tooltip bottom>
                    <template #activator="{ on: tooltip }">
                      <v-btn
                        v-if="wasAuthor(t)"
                        v-on="{ ...tooltip, ...dialog }"
                        class="ma-2"
                        text
                        icon
                        color="red lighten-2"
                      >
                        <v-icon>mdi-account-remove</v-icon>
                      </v-btn>
                    </template>
                    <span>Unregister</span>
                  </v-tooltip>
                </template>
                <v-card>
                  <v-card-title> Confirm Delete </v-card-title>
                  <v-card-text>
                    Are you sure you want to unregister? You will have to sign
                    up as a tutor again.
                  </v-card-text>
                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn
                      color="primary"
                      text
                      @click="
                        dialog = false;
                        remove(t.id);
                      "
                    >
                      Confirm
                    </v-btn>
                  </v-card-actions>
                </v-card>
              </v-dialog>
              <v-btn
                v-if="wasAuthor(t)"
                text
                icon
                :to="{ name: 'EditTutor', params: { id: t.id } }"
              >
                <v-icon>mdi-pencil</v-icon>
              </v-btn>
            </v-card-actions>

            <v-expand-transition>
              <div v-show="t.show">
                <v-card class="mx-auto" max-width="344" outlined>
                  <v-list-item-title>About</v-list-item-title>
                  <v-list-item-content>{{ t.desc }}</v-list-item-content>
                  <v-list-item-title>Time Availibility</v-list-item-title>

                  <v-list-item v-for="d in t.days" :key="d">
                    <v-list-item-content>
                      <v-list-item-title>{{ d }}</v-list-item-title>
                    </v-list-item-content>
                  </v-list-item>
                  <v-list>
                    <v-list-item-title>Contact Info</v-list-item-title>
                    <v-list-item v-for="(c, i) in t.contactInfo" :key="i">
                      <v-list-item-avatar>
                        <v-avatar size="50px" tile>
                          <img :src="tiles[i].img" />
                        </v-avatar>
                      </v-list-item-avatar>
                      <v-list-item-content>
                        {{ c }}
                      </v-list-item-content>
                    </v-list-item>
                  </v-list>
                </v-card>
              </div>
            </v-expand-transition>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      emailOfNewAdmin: null,
      tutors: [],
      name: null,
      clsd: null,
      show: false,
      dialog: false,
      nameOfCurrentUser: null,
      snackbar: false,
      timeout: 10000,
      errors: [],
      tiles: [
        {
          img: "https://img-authors.flaticon.com/google.jpg",
        },
        {
          img:
            "https://i.pinimg.com/736x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg",
        },
        {
          img:
            "https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png",
        },
      ],
    };
  },
  methods: {
    remove(x) {
      const db = firebase.firestore();
      db.collection("Our Tutors").doc(x).delete();
      db.collection("Our Tutors")
        .doc(x)
        .collection("Interested Tutees")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        });
    },
    wasAuthor(t) {
      return t.id == firebase.auth().currentUser.email;
    },
    sendNotice(toThisTutor, cls) {
      console.log("sendNotice", toThisTutor, cls);
      console.log("currentUser", firebase.auth().currentUser);
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(toThisTutor)
        .collection("Interested Tutees")
        .doc(firebase.auth().currentUser.email)
        .set({
          userEmail: firebase.auth().currentUser.email,
          name: firebase.auth().currentUser.displayName,
          class: cls,
        });
    },
    makeAdmin() {
      // var addMessage = firebase.functions().httpsCallable("addAdminRole");
      // addMessage({ email: "david.dw.guo@gmail.com" }).then((result) => {
      //   console.log(result.data.message);
      // });
      axios
        .post("functions/addAdminRole", { email: this.emailOfNewAdmin })
        .then((res) => {
          console.log(res.data.message);
        })
        .then((res) => {
          
        })
        .catch((error) => {
          console.log(error);
        });
    },
  },

  created() {
    firebase
      .firestore()
      .collection("Our Tutors")
      .onSnapshot((querySnapshot) => {
        this.tutors = [];
        querySnapshot.forEach((doc) => {
          var tutor = doc.data();
          tutor.id = doc.id;
          tutor.show = false;
          this.tutors.push(tutor);
        });
      });
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>
