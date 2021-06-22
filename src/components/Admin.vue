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
        <template v-slot:[`item.maxTut`]="{ item }">
          <v-chip v-if="item.maxTut == 0" color="red">
            {{ item.maxTut }}
          </v-chip>
          <div v-else>{{ item.maxTut }}</div>
        </template>

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
          <v-icon @click.prevent="open(item)"> mdi-school </v-icon>
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
        v-model="selected2"
        item-key="name"
        single-select
        dense
        :headers="headers2"
        :items="tutees"
        :search="search"
        class="elevation-1"
      >
        <template v-slot:[`item.paired`]="{ item }">
          <v-icon
            v-for="(cls, i) in item.paired"
            :key="i"
            :color="!item.paired[i] ? 'red' : 'green'"
          >
            {{
              !item.paired[i] ? "mdi-close-thick" : "mdi-checkbox-marked-circle"
            }}
          </v-icon>
        </template>
        <template v-slot:[`item.sClass`]="{ item }">
          <v-btn
            small
            rounded
            v-for="(cls, i) in item.classes"
            :key="cls.name"
            :disabled="cls.p"
            :color="clicked == cls.name ? 'primary' : ''"
            @click="rowClickTutee(item, cls.name, i)"
          >
            {{ cls.name }}
          </v-btn>
        </template>
      </v-data-table>
    </v-card>
    <div class="half">
      <h2 class="half">{{ tutor.name }} x {{ tutee.name }}({{ clicked }})</h2>
      <v-btn
        :disabled="!this.valid"
        color="primary"
        @click="pair(tutor, tutee)"
      >
        Match!
      </v-btn>

      <!-- <v-btn color="primary" @click="test">
        test
      </v-btn> -->
    </div>
    <h2>Pairs</h2>

    <v-container>
      <v-row no-gutters>
        <v-col v-for="(pair, i) in pairs" :key="i" cols="12" sm="3">
          <v-card class="mx-auto" max-width="344" outlined>
            <v-card-title class="title primary--text pl=0">
              {{ pair.name }}
            </v-card-title>
            <v-list-item v-for="(cls, x) in pair.classes" :key="x">
              {{ cls.class }} --- {{ cls.tutor.name }}</v-list-item
            >
          </v-card>
        </v-col>
      </v-row>
    </v-container>

    <v-card max-width="344" outlined>
      <v-text-field
        class="half"
        style="width: 70%"
        v-model="emailOfNewAdmin"
      ></v-text-field>
      <v-card-actions>
        <v-btn @click="makeAdmin">make admin </v-btn>
      </v-card-actions>
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
      clicked: "",
      index: -1,

      emailOfNewAdmin: null,
      search: "",
      tutor: {},
      tutee: {},
      selected1: [],
      selected2: [],
      clr: "",

      headers1: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Gender", value: "gender" },
        { text: "Classes", value: "sClass" },
        { text: "Email", value: "email" },
        { text: "Phone Number", value: "phonenumber" },
        { text: "Tutee spots left", value: "maxTut" },
        { text: "Grade", value: "grade" },
        { text: "Facebook", value: "facebook" },
        { text: "Grades", value: "actions", sortable: false },
      ],
      headers2: [
        {
          text: "Name",
          align: "start",
          filterable: false,
          value: "name",
        },
        { text: "Classes", value: "sClass" },
        { text: "Paired?", value: "paired" },
        { text: "Email", value: "email" },
        { text: "Facebook", value: "facebook" },

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
      if (item.maxTut == 0) {
        row.disable(true);
      }
      if (row.isSelected) {
        row.select(false);
        this.tutor = {};
      } else {
        row.select(true);
        this.tutor = item;
      }
      this.gradeT = this.tutor.classes;
    },
    rowClickTutee: function(tutee, j, i) {
      tutee.clsID = i;
      this.tutee = tutee;
      this.clicked = j;
      console.log(this.clicked, i);
    },
    pair(tutor, tutee) {
      // firebase
      //   .firestore()
      //   .collection("Pairs")
      //   .doc(tutee.name)
      //   .set({ tutee: tutee });

      //Each class is unique for the tutee
      // for tutees to find their tutor
      firebase
        .firestore()
        .collection("Tutees")
        .doc(tutee.email)
        .collection("Classes")
        .doc(this.clicked)
        .update({
          tutor: tutor,
        });

      // //for tutors to find their tutees
      // firebase
      //   .firestore()
      //   .collection("OurTutors")
      //   .doc(tutor.email)
      //   .collection("classes")
      //   .doc(this.clicked)

      //   .set({
      //     tutee: tutee,
      //   });

      const dec = firebase.firestore.FieldValue.increment(-1);
      firebase
        .firestore()
        .collection("OurTutors")
        .doc(tutor.email)
        .update({
          maxTut: dec,
        });

      // firebase
      //   .firestore()
      //   .collection("Tutees")
      //   .doc(tutee.id)
      //   .get()
      //   .then((doc) => {
      //     var classes = doc.data().classes;
      //     var cls = classes[tutee.clsID];
      //     cls.p = true;
      //     classes[tutee.clsID] = cls;
      //     firebase
      //       .firestore()
      //       .collection("Tutees")
      //       .doc(tutee.id)
      //       .update({ classes: classes });
      //   });

      this.tutor = {};
      this.tutee = {};
      this.selected1 = [];
      this.selected2 = [];
      this.clicked = "";
    },
    test() {
      console.log(this.tutee);
      console.log(this.tutee.clsID);
    },

    open() {
      this.dialog = true;
    },
  },
  created() {
    const db = firebase.firestore();
    var query = db.collection("OurTutors");

    query.onSnapshot((querySnapshot) => {
      var fArray = [];
      querySnapshot.forEach((doc) => {
        let tutor = doc.data();
        tutor.id = doc.id;
        var names = [];

        doc.ref.collection("Classes").onSnapshot((snap) => {
          console.log(snap);
          snap.forEach((doc) => {
            names.push(doc.data().name);
          });
        });
        tutor.sClass = names;

        fArray.push(tutor);
      });
      this.tutors = fArray;
    });
    db.collection("Tutees").onSnapshot((querySnapshot) => {
      var fArray = [];
      querySnapshot.forEach((doc) => {
        let tutee = doc.data();
        tutee.id = doc.id;
        var paired = [];
        var names = [];
        var classes = [];

        doc.ref.collection("Classes").onSnapshot((snap) => {
          snap.forEach((doc) => {
            classes.push(doc.data());
            paired.push(doc.data().p);
            names.push(doc.data().name);
          });
        });
        console.log(classes);
        tutee.classes = classes;
        tutee.sClass = names;
        tutee.paired = paired;

        fArray.push(tutee);
      });
      this.tutees = fArray;
    });
    // db.collection("Tutees").onSnapshot((querySnapshot) => {
    //   var fArray = [];
    //   querySnapshot.forEach((doc) => {
    //     let pair = doc.data();
    //     pair.id = doc.id;
    //     firebase
    //       .firestore()
    //       .collection("Tutees")
    //       .doc(doc.id)
    //       .collection("classes")
    //       .get()
    //       .then((querySnapshot2) => {
    //         pair.classes = [];
    //         querySnapshot2.forEach((doc2) => {
    //           // doc.data() is never undefined for query doc snapshots
    //           //console.log(doc2.id, " => ", doc2.data());
    //           let cls = { class: doc2.id, tutor: doc2.data().tutor };
    //           console.log(cls);
    //           pair.classes.push(cls);
    //         });
    //         fArray.push(pair);
    //       });
    //   });
    //   this.pairs = fArray;
    // });
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
