<template>
  <div>
    <h1 class="text-center display-2 text-accent-3">
      Edit Tutor
    </h1>
    <v-form ref="form" v-model="valid" lazy-validation>
      <v-container style="width: 50%">
        <v-row align="center" justify="center">
          <v-col cols="12" md="5" class="mx-auto">
            <v-text-field
              v-model="info.fName"
              dense
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => (v && v.indexOf(' ') == -1) || 'No spaces',
              ]"
              label="First Name"
              outlined
            ></v-text-field>
          </v-col>
          <v-col>
            <v-text-field
              v-model="info.lName"
              dense
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => (v && v.indexOf(' ') == -1) || 'No spaces',
              ]"
              label="Last Name"
              outlined
            ></v-text-field
          ></v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-col md="5">
            <v-autocomplete
              v-model="info.grade"
              dense
              :rules="[(v) => !!v || 'This field is required']"
              :items="grades"
              label="Select Grade"
              outlined
            ></v-autocomplete>
          </v-col>
          <v-col>
            <v-text-field
              v-model.number="info.phonenumber"
              type="number"
              label="Phone Number"
              :rules="[(v) => !!v || 'This field is required']"
            >
            </v-text-field>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-col cols="12" md="5">
            <v-text-field
              v-model.number="info.maxTut"
              type="number"
              dense
              :step="1"
              :rules="[
                (v) => !!v || 'This field is required',
                (v) => v < 10 || 'Must be less than 10',
              ]"
              label="Maxiumum students"
              outlined
              required
            ></v-text-field>
          </v-col>
          <v-col>
            <v-autocomplete
              v-model="info.gender"
              dense
              :rules="[(v) => !!v || 'This field is required']"
              :items="genders"
              label="Gender"
              outlined
            ></v-autocomplete>
          </v-col>
        </v-row>

        <v-row align="center" justify="center">
          <v-text-field
            v-model="info.desc"
            label="Enter a short description for tutees to see"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-row>
        <!-- <v-row align="center" justify="center">
          <v-select
            return-object
            v-model="selectedClasses"
            dense
            :items="classes"
            item-text="name"
            :rules="[required]"
            label="What classes can you teach?"
            multiple
            chips
            required
          >
          </v-select>
        </v-row>
        <br />

        <v-row v-for="(cls, i) in selectedClasses" :key="i">
          <v-text-field
            :rules="[(v) => !!v || 'This field is required']"
            v-model="cls.teacher"
            :label="cls.name + ' Teacher'"
          >
          </v-text-field>
          <v-select
            v-model="cls.sem1"
            :items="academicGrades"
            :rules="[(v) => !!v || 'This field is required']"
            :label="cls.name + ' Sem 1 Grade'"
          ></v-select>
          <v-select
            v-model="cls.sem2"
            :items="academicGrades"
            :rules="[(v) => !!v || 'This field is required']"
            :label="cls.name + ' Sem 2 Grade'"
          ></v-select>
        </v-row> -->
        <v-alert dense border="left" type="warning">
          Classes <strong>cannot </strong> be changed if you paired are with a
          tutee. Please contact us at msjstemsuccess@gmail.com to remove or add
          classes
        </v-alert>

        <br />

        <h2>Contact Information</h2>
        <v-list>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img
                  :src="
                    `https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png`
                  "
                  :alt="'facebook logo'"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="info.facebook"
                :rules="[(v) => !!v || 'This field is required']"
                label="Facebook Username"
                required
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
          <v-list-item>
            <v-list-item-avatar>
              <v-avatar size="50px" tile>
                <img
                  :src="
                    `https://i.pinimg.com/736x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg`
                  "
                  :alt="'instagram logo'"
                />
              </v-avatar>
            </v-list-item-avatar>
            <v-list-item-content>
              <v-text-field
                v-model="info.instagram"
                label="Instagram (optional)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <v-row align="center" justify="center">
          <v-btn color="primary" @click="save" :disabled="!valid">
            save
          </v-btn>
        </v-row>
      </v-container>
    </v-form>
    <!-- <v-btn color="primary" @click="test">
      test
    </v-btn> -->
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    valid: true,
    info: {},

    grades: ["9", "10", "11", "12"],
    genders: ["Male", "Female", "Other"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    academicGrades: ["A", "B", "C", "D", "F"],
    selectedClasses: [],

    classes: [
      { header: "Sciences" },
      { divider: true },
      { name: "AP Biology" },
      { name: "AP Chemistry" },
      { name: "AP Physics 1" },
      { name: "AP Physics C" },
      { name: "CP Physics" },
      { name: "AP Environmental Science" },
      { name: "Physics in the Universe" },
      { name: "Biology" },
      { name: "Chemistry" },
      { name: "Living Earth" },
      { name: "Anatomy Physiology" },
      { name: "Chemical Technology" },
      { divider: true },

      { header: "Maths" },
      { divider: true },
      { name: "AP Statistics" },
      { name: "AP Computer Science A" },
      { name: "AP Calculus AB" },
      { name: "AP Calculus BC" },
      { name: "CP Calculus" },
      { name: "Precalculus" },
      { name: "Algebra 2 | Trig" },
      { name: "Algebra 2" },
      { name: "Trigonometry" },
      { name: "Geometry" },
      { name: "Algebra 1" },
      { name: "Discrete Math" },
      { name: "Intro to C++" },
      { name: "Multivariable" },
      { name: "Linear Algebra" },
    ],
  }),
  created() {
    var db = firebase.firestore();
    const userEmail = firebase.auth().currentUser.email;
    db.collection("OurTutors")
      .doc(userEmail)
      .get()
      .then((doc) => {
        this.info = doc.data();
      });
  },

  methods: {
    test() {
      console.log(this.info);
    },
    save() {
      if (this.$refs.form.validate()) {
        var db = firebase.firestore();
        const userEmail = firebase.auth().currentUser.email;
        this.info.name = this.info.fName + " " + this.info.lName;
        db.collection("OurTutors")
          .doc(userEmail)
          .update(this.info);
      }
      this.$router.push("/OurTutors");
    },

    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "Required.";
    },
  },
};
</script>

<style>
h1 {
  color: #065c1d;
  text-align: center;
}
</style>
