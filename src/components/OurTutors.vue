<template>
  <div>
    <h1>Meet our tutors</h1>
    <!-- {{ tutors }}

    <ul id="v-for-object" class="demo">
      <li v-for="(tutor, i) in tutors" :key="i">
        {{ tutor.id }}
        <ul id="v-for-object" class="demo">
          <li v-for="(cls, i) in tutor.classes" :key="i">
            {{ cls }}
          </li>
        </ul>
      </li>
    </ul> -->

<!-- find suitable formatting for v-card-group  -->
    <v-list expand>
      <v-card-group
        :value="true"
        prepend-icon="mdi-account-circle"
        v-for="(tutor, i) in tutors"
        :key="i"
        class="pl-10"
      >
        <v-container outlined dense md3>
          <v-row justify="space-around">
            <v-card class="mx-auto" width="400">
              <v-img height="200px" :src="tutor.photoURL">
                <v-app-bar flat color="rgba(255, 255, 255, 255)">
                  <v-toolbar-title
                    v-text="tutor.id"
                    class="title primary--text pl-0"
                  ></v-toolbar-title>
                  <v-spacer></v-spacer>
                </v-app-bar>
                <v-card-title class="white--text mt-8">
                  <p v-text="tutor.name" class="white--text ml-3"></p>
                </v-card-title>
              </v-img>
              <v-card-text>
                <div class="font-weight-bold primary--text ml-8 mb-2">
                  Classes
                </div>
                <v-list-item v-for="(cls, j) in tutor.classes" :key="j">
                  <v-list-item-title v-text="cls"></v-list-item-title>
                </v-list-item>
              </v-card-text>
              <v-card-actions>
                <v-btn icon color="primary" @click="tutor.show = !tutor.show">
                  <v-icon>{{
                    tutor.show ? "mdi-chevron-up" : "mdi-chevron-down"
                  }}</v-icon>
                </v-btn>
              </v-card-actions>
              <v-expand-transition>
                <div v-show="tutor.show">
                  <v-divider></v-divider>
                  <v-card-text>Display more information here</v-card-text>
                </div>
              </v-expand-transition>
            </v-card>
          </v-row>
        </v-container>
      </v-card-group>
    </v-list>
  </div>
</template>

 <!-- <template v-slot:activator>
          <v-list-item-title v-text="tutor.name"></v-list-item-title>
          <v-list-item-subtitle v-text="tutor.id"></v-list-item-subtitle>
          <v-list-item-subtitle v-text="tutor.grade"></v-list-item-subtitle>
        </template>
        <v-list-item v-for="(cls, i) in tutor.classes" :key="i">
          <v-list-item-title v-text="cls"></v-list-item-title>
        </v-list-item> -->



<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tutors: [],
      shows: [],
    };
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
  methods: {
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>