<template>
  <div>
    <h2>Tutors</h2>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        @click:row="rowClickTutor"
        item-key="name"
        single-select
        dense
        :headers="headers1"
        :items="tutors"
        :search="search"
        class="elevation-1"
      ></v-data-table>
    </v-card>
    <br />
    <h2>Tutees</h2>
    <v-card>
      <v-card-title>
        <v-text-field
          v-model="search"
          append-icon="mdi-magnify"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        @click:row="rowClickTutee"
        item-key="name"
        single-select
        dense
        :headers="headers2"
        :items="tutees"
        :search="search"
        class="elevation-1"
      ></v-data-table>
    </v-card>
    <div class="half">
      <h2 class="half">{{ tutor.name }} x {{ tutee.name }}</h2>
      <v-btn color="primary" @click="pair(tutor, tutee)">
        Match!
      </v-btn>
    </div>
    <h2>Pairs</h2>

    <div>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(pair, i) in pairs" :key="i">
          <v-expansion-panel-header>
            {{ pair.tutor.name }} {{ JSON.stringify(pair.tutor.classes) }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn>test</v-btn>
            {{ pair.tutee.name }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      search: "",
      tutor: {},
      tutee: {},

      headers1: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Classes", value: "classes" },
        { text: "Email", value: "contactInfo[0]" },
        { text: "Tutee spots left", value: "maxTut" },
        { text: "Grade", value: "grade" },
      ],
      headers2: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Classes", value: "classes" },
        { text: "Notes", value: "notes" },
      ],
      tutors: [],
      tutees: [],
      pairs: [],
    };
  },
  methods: {
    rowClickTutor: function(item, row) {
      row.select(true);
      this.tutor = item;
      if (row.isSelected) {
        row.select(false);
        this.tutor = "Tutor";
      }
    },
    rowClickTutee: function(item, row) {
      row.select(true);
      this.tutee = item;
      if (row.isSelected) {
        row.select(false);
        this.tutee = "Tutee";
      }
    },
    pair(tutor, tutee) {
      firebase
        .firestore()
        .collection("Pairs")
        .doc()
        .set({
          tutor: tutor,
          tutee: tutee,
        });
      //   firebase
      //     .firestore()
      //     .collection("questions")
      //     .doc(id)
      //     .update({
      //       title: newTitle,
      //       question: newQ,
      //     });
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
        var fArray = [];
        querySnapshot.forEach((doc) => {
          let tutor = doc.data();
          tutor.id = doc.id;
          fArray.push(tutor);
        });
        this.tutors = fArray;
      });
    firebase
      .firestore()
      .collection("Tutees")
      .onSnapshot((querySnapshot) => {
        var fArray = [];
        querySnapshot.forEach((doc) => {
          let tutee = doc.data();
          tutee.id = doc.id;
          fArray.push(tutee);
        });
        this.tutees = fArray;
      });
    firebase
      .firestore()
      .collection("Pairs")
      .onSnapshot((querySnapshot) => {
        var fArray = [];
        querySnapshot.forEach((doc) => {
          let pair = doc.data();
          pair.id = doc.id;
          fArray.push(pair);
        });
        this.pairs = fArray;
      });
  },
  computed: {
    valid() {
      return this.tutor != null && this.tutee.length != null;
    },
  },
};
</script>

<style>
.half {
  text-align: center;
  margin: auto;
  width: 50%;
}
tr.v-data-table__selected {
  background: #7d92f5 !important;
}
</style>
