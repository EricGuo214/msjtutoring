<template>
  <div>
    <h1 class="text-center display-2 primary--text text-accent-3">
      Edit Tutor Form
    </h1>
    <v-form>
      <v-container style="width: 50%">
        <v-row align="center" justify="center">
          <v-col cols="12" md="4" class="mx-auto">
            <v-text-field
              ref="firstName"
              v-model="info.fName"
              dense
              :rules="[() => !!info.fName || 'This field is required']"
              label="First Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              ref="lastName"
              v-model="info.lName"
              dense
              :rules="[() => !!info.lName || 'This field is required']"
              label="Last Name"
              outlined
              required
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-autocomplete
              ref="grade"
              v-model="info.grade"
              dense
              :rules="[() => !!info.grade || 'This field is required']"
              :items="grades"
              label="Select Grade"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-select
              dense
              v-model="info.classes"
              :items="classes"
              :menu-props="{ maxHeight: '400' }"
              label="Choose your classes"
              multiple
              chips
              hint="Must have received a grade of 90% or higher both semeseters"
              persistent-hint
              placeholder="asd"
            ></v-select>
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col cols="12" md="4">
            <v-text-field
              ref="maxTut"
              v-model.number="info.maxTut"
              :step="1"
              dense
              :rules="[() => !!info.maxTut || 'This field is required']"
              label="Maxiumum students"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-select
              dense
              v-model="info.days"
              :items="days"
              :menu-props="{ maxHeight: '400' }"
              label="Available times"
              multiple
              chips
            ></v-select>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="info.desc"
            label="Enter a short description for tutees to see"
          >
          </v-text-field>
        </v-row>
        <v-row align="center" justify="center">
          <v-btn color="primary" @click="onSubmit"> Save </v-btn>
          <v-btn color="primary" to=/OurTutors> Back </v-btn>
        </v-row>
        
      </v-container>
    </v-form>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data() {
    return {
      tID: this.$route.params.id,
      info: {},

      grades: ["9", "10", "11", "12"],

      classes: [
        "AP Biology",
        "AP Chemistry",
        "AP Computer Science A",
        "AP Physics",
        "AP Spanish",
        "AP Chinese",
        "AP Statistics",
        "AP Calculus AB",
        "AP Calculus BC",
      ],
      days: [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday",
        "Sunday",
      ],
    };
  },
  methods: {
    onSubmit() {
      firebase
        .firestore()
        .collection("Our Tutors")
        .doc(firebase.auth().currentUser.email)
        .update(this.info);
      //this.$router.push("/OurTutors");
      console.log("lol");
    },
  },
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        firebase
          .firestore()
          .collection("Our Tutors")
          .doc(this.tID)
          .get()
          .then((doc) => {
            if (doc.exists) {
              this.info = doc.data();
            }
          });
      }
    });
  },
};
</script>
