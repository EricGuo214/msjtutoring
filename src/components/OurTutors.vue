<template>
  <div>
    <h1>Meet our tutors</h1>

    <v-container>
      <v-row>
        <v-col v-for="t in tutors" :key="t.id" cols="12" sm="4">
          <v-card class="mx-auto" max-width="344">
            <v-card-title class="title primary--text pl-0">
              {{ t.name }}
            </v-card-title>
            <!-- <v-img height="200px" :src="t.photoURL"> </v-img> -->
            <v-card-text>
              Classes
              <v-list-item v-for="cls in t.classes" :key="cls">
                <v-list-item-title v-text="cls"></v-list-item-title>
              </v-list-item>
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
                  <v-card-title>
                    Confirm Delete
                  </v-card-title>

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
export default {
  data() {
    return {
      tutors: [],
      show: false,
    };
  },
  methods: {
    remove(x) {
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(x)
        .delete();
    },
    wasAuthor(t) {
      return t.id == firebase.auth().currentUser.uid;
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
          // this.shows.push(true);
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
// @click.prevent="remove(t.id)"
