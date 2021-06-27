<template>
  <v-app>
    <v-app-bar app color="#2bbafc" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>Mission Tutoring</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn color="#027df0" dark v-on="on">{{ user.email }}</v-btn>
        </template>
        <v-list>
          <v-list-item to="/profile?">
            <v-list-item-title>Profile</v-list-item-title>
          </v-list-item>
          <v-list-item @click="onSignout">
            <v-list-item-title>Sign out</v-list-item-title>
          </v-list-item>
        </v-list>
      </v-menu>
      <v-btn v-else to="/SignIn">Get Started</v-btn>
    </v-app-bar>

    <v-navigation-drawer v-model="drawer" app temporary>
      <v-list nav dense>
        <v-list-item-group
          v-model="group"
          active-class="deep-purple--text text--accent-4"
        >
          <v-list-item to="/">
            <v-list-item-icon>
              <v-icon>mdi-home</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Home</v-list-item-title>
          </v-list-item>

          <v-list-item to="/ApplyToBeTutor">
            <v-list-item-icon>
              <v-icon>mdi-school</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Apply To be a Tutor</v-list-item-title>
          </v-list-item>
          <v-list-item to="/ApplyForATutor">
            <v-list-item-icon>
              <v-icon>mdi-account-search</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Apply For a Tutor</v-list-item-title>
          </v-list-item>

          <v-list-item to="/OurTutors">
            <v-list-item-icon>
              <v-icon>mdi-book-open-variant</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Our Tutors</v-list-item-title>
          </v-list-item>

          <v-list-item to="/questions">
            <v-list-item-icon>
              <v-icon>mdi-message-question</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Question Forum</v-list-item-title>
          </v-list-item>

          <v-list-item to="/Inbox">
            <v-list-item-icon>
              <v-icon>mdi-email</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Inbox</v-list-item-title>
          </v-list-item>
          <v-list-item to="/Admin" v-if="isAdmin">
            <v-list-item-icon>
              <v-icon>mdi-head-cog</v-icon>
            </v-list-item-icon>
            <v-list-item-title>Admin</v-list-item-title>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-navigation-drawer>

    <v-main>
      <v-container fluid>
        <router-view></router-view>
      </v-container>
    </v-main>
  </v-app>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      drawer: false,
      group: null,
      user: null,
      isAdmin: false,
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
      if (firebase.auth().currentUser != null) {
        user.getIdTokenResult().then((idTokenResult) => {
          // console.log(idTokenResult.claims)
          if (idTokenResult.claims.admin) {
            this.isAdmin = true;
          }
        });
      }
      // let currUser = firebase.auth().currentUser;
      // currUser.getIdTokenResult().then((idTokenResult) => {
      //   if (idTokenResult.claims.isAdmin) {
      //     this.isAdmin = true;
      //   }
    });
  },
  methods: {
    onSignout(e) {
      e.stopPropagation();
      firebase.auth().signOut();
      this.isAdmin = false;
    },
    // isAdmin() {
    // return false;
    // let user = firebase.auth().currentUser;
    // if (user == null) {
    //   return false;
    // }
    // let result = false;
    // user
    //   .getIdTokenResult()
    //   .then((idTokenResult) => {
    //     if (idTokenResult.claims.isAdmin) {
    //       result = true;
    //     }
    //   })
    //   .catch(() => {});
    // return result;
    // },
  },
};
</script>
