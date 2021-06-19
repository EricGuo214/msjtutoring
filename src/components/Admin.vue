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
        v-model="selected1"
        item-key="name"
        single-select
        dense
        :headers="headers1"
        :items="tutors"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:top>
          <v-dialog v-model="dialog" max-width="500px">
            <v-data-table
              :headers="gradeHeaders"
              :items="gradeT"
              hide-default-footer
            ></v-data-table>
          </v-dialog>
        </template>
        <template v-slot:[`item.actions`]="{ item }">
          <v-icon @click.prevent="open(item)">
            mdi-school
          </v-icon>
        </template>
      </v-data-table>
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
        v-model="selected2"
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
      <v-btn
        :disabled="!this.valid"
        color="primary"
        @click="pair(tutor, tutee)"
      >
        Match!
      </v-btn>

      <v-btn color="primary" @click="test">
        test
      </v-btn>
    </div>
    <h2>Pairs</h2>

    <div>
      <v-expansion-panels multiple>
        <v-expansion-panel v-for="(pair, i) in pairs" :key="i">
          <v-expansion-panel-header>
            Tutor: {{ pair.tutor.name }} Classes: {{ pair.tutor.stringClasses }}
          </v-expansion-panel-header>
          <v-expansion-panel-content>
            <v-btn>test</v-btn>
            {{ pair.tutee.name }}
          </v-expansion-panel-content>
        </v-expansion-panel>
      </v-expansion-panels>
    </div>
    <v-card>
      <v-text-field v-model="emailOfNewAdmin"></v-text-field>
      <v-btn @click="makeAdmin">make admin </v-btn>
    </v-card>
    <v-spacer></v-spacer>
    <v-card>
      <v-text-field v-model="emailOfNewAdmin"></v-text-field>
      <v-btn @click="addToAdminCollection">add to collection </v-btn>
    </v-card>
  </div>
</template>

<script>
import firebase from "firebase";
import axios from "axios";
export default {
  data() {
    return {
      dialog: false,

      emailOfNewAdmin: null,
      search: "",
      tutor: {},
      tutee: {},
      selected1: [],
      selected2: [],

      headers1: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Gender", value: "gender" },

        { text: "Classes", value: "stringClasses" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phonenumber" },
        { text: "Tutee spots left", value: "maxTut" },
        { text: "Grade", value: "grade" },
        { text: "Facebook", value: "facebook" },
        { text: "More", value: "actions", sortable: false },
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
      gradeHeaders: [
        {
          text: "Class",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Teacher", value: "teacher" },
        { text: "Semester 1", value: "sem1" },
        { text: "Semester 2", value: "sem2" },
      ],
      tutors: [],
      tutees: [],
      pairs: [],
      gradeT: [],
    };
  },
  methods: {
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
        .then(() => {
          firebase
            .firestore()
            .collection("Admins")
            .doc(this.emailOfNewAdmin)
            .set({
              email: this.emailOfNewAdmin,
            });
        })
        .catch((error) => {
          console.log(error);
        });
    },
    addToAdminCollection() {
      firebase
        .firestore()
        .collection("Admins")
        .doc(this.emailOfNewAdmin)
        .set({
          email: this.emailOfNewAdmin,
          adder: firebase.auth().currentUser.email,
        });
    },
    rowClickTutor: function(item, row) {
      if (row.isSelected) {
        row.select(false);
        this.tutor = {};
      } else {
        row.select(true);
        this.tutor = item;
      }
      this.gradeT = this.tutor.classes;
    },
    rowClickTutee: function(item, row) {
      if (row.isSelected) {
        row.select(false);
        this.tutee = {};
      } else {
        row.select(true);
        this.tutee = item;
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
      const dec = firebase.firestore.FieldValue.increment(-1);
      firebase
        .firestore()
        .collection("OurTutors")
        .doc(tutor.email)
        .update({
          maxTut: dec,
        });
      this.tutor = {};
      this.tutee = {};
      this.selected1 = [];
      this.selected2 = [];
    },
    test() {
      console.log(this.valid);
      console.log(Object.keys(this.tutor).length == 0);
      console.log(Object.keys(this.tutee).length == 0);
    },
    grades(row) {
      console.log(row);
      return [{ name: "biology", teacher: "Mr. Melcic", sem1: "A", sem2: "B" }];
    },
    open() {
      this.dialog = true;
    },
  },
  created() {
    firebase
      .firestore()
      .collection("OurTutors")
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
      return (
        Object.keys(this.tutor).length != 0 &&
        Object.keys(this.tutee).length != 0
      );
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
