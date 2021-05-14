<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-app-bar-nav-icon @click="drawer = true"></v-app-bar-nav-icon>
      <v-toolbar-title>MSJ Tutoring</v-toolbar-title>

      <v-spacer></v-spacer>
      <v-menu offset-y v-if="user">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" dark v-on="on">{{ user.email }}</v-btn>
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

    <v-navigation-drawer v-model="drawer" absolute temporary>
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
    };
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      this.user = user;
    });
  },
  methods: {
    onSignout(e) {
      e.stopPropagation();
      firebase.auth().signOut();
    },
  },
};
</script>
