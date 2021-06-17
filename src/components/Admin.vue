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
      <h2 class="half">{{ tutor }} x {{ tutee }}</h2>
      <v-btn :disabled="!valid" color="primary" @click="pair(tutor, tutee)">
        Match!
      </v-btn>
    </div>
    <h2>Pairs</h2>
    <h4>{{ pairs }}</h4>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      search: "",
      tutor: "Tutor",
      tutee: "Tutee",

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
      pairs: [{ tutor: "", tutee: "" }],
    };
  },
  methods: {
    rowClickTutor: function(item, row) {
      row.select(true);
      this.tutor = item.name;
      if (row.isSelected) {
        row.select(false);
        this.tutor = "Tutor";
      }
    },
    rowClickTutee: function(item, row) {
      row.select(true);
      this.tutee = item.name;
      if (row.isSelected) {
        row.select(false);
        this.tutee = "Tutee";
      }
    },
    pair(tutor, tutee) {
      this.pairs.push({ tutor, tutee });
      this.tutor = "Tutor";
      this.tutee = "Tutee";
    },
  },
  created() {
    firebase
      .firestore()
      .collection("Our Tutors")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var tutor = doc.data();
          tutor.id = doc.id;
          this.tutors.push(tutor);
        });
      });
    firebase
      .firestore()
      .collection("Tutees")
      .onSnapshot((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          var tutee = doc.data();
          tutee.id = doc.id;
          this.tutees.push(tutee);
        });
      });
  },
  computed: {
    valid() {
      return this.tutor != "Tutor" && this.tutee != "Tutee";
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
