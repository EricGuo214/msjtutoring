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

    <v-list expand>
      <v-list-group
        :value="true"
        prepend-icon="mdi-account-circle"
        v-for="(tutor, i) in tutors"
        :key="i"
      >
        <template v-slot:activator>
          <v-list-item-title v-text="tutor.id"></v-list-item-title>
        </template>
        <v-list-item v-for="(cls, i) in tutor.classes" :key="i">
          <v-list-item-title v-text="cls"></v-list-item-title>
        </v-list-item>
      </v-list-group>
    </v-list>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tutors: [],
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