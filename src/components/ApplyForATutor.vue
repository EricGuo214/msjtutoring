<template>
  <body>
    <div class="half">
      <h1>Apply For A Tutor</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          dense
          :rules="[(v) => !!v || 'This field is required']"
          label="Full name"
          outlined
          required
        ></v-text-field>

        <v-col>
          <v-text-field
            v-model.number="phonenumber"
            type="number"
            label="Phone Number"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-col>

        <v-select
          v-model="selectedClasses"
          dense
          :items="classes"
          item-text="name"
          :rules="[required]"
          label="Select the classes you need help in"
          multiple
          chips
          required
          return-object
        >
        </v-select>
        <br />
        <v-text-field
          v-model="notes"
          label="Any preferences or notes for your tutor? (optional)"
          outlined
        ></v-text-field>

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
                v-model="facebook"
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
                v-model="instagram"
                label="Instagram (optional)"
              ></v-text-field>
            </v-list-item-content>
          </v-list-item>
        </v-list>

        <!-- <v-dialog v-model="dialog" width="500">
          <template v-slot:activator="{ on, attrs }">
            <v-btn
              color="primary"
              @click="post"
              :disabled="!isValid"
              v-bind="attrs"
              v-on="on"
            >
              Submit
            </v-btn>
          </template>

          <v-card>
            <v-card-title>
              Success!
            </v-card-title>

            <v-card-text>
              Please check your inbox often to see if you have been paired with
              a tutor
            </v-card-text>

            <v-divider></v-divider>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" to=/inbox text @click="dialog = false">
                Inbox
              </v-btn>
              <v-btn color="primary" to=/ text @click="dialog = false">
                Home
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog> -->
        <v-btn :disabled="!isValid" color="primary" @click="submit">
          submit</v-btn
        >
        <!-- <v-btn color="primary" @click="test"> test</v-btn> -->
      </v-form>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    valid: true,
    dialog: false,

    name: "",
    phonenumber: "",
    selectedClasses: [],
    notes: "",
    facebook: "",
    instagram: "",
    // name: "Rithwik V",
    // phonenumber: "150345",
    // selectedClasses: [],
    // notes: "guy",
    // facebook: "rvaidun",
    // instagram: "rith",

    gender: "",
    genders: ["Male", "Female", "Other"],

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

  methods: {
    test() {
      console.log(this.selectedClasses);
    },
    submit() {
      if (this.$refs.form.validate()) {
        const userEmail = firebase.auth().currentUser.email;
        var db = firebase.firestore();
        db.collection("Tutees")
          .doc(userEmail)
          .set({
            name: this.name,
            notes: this.notes,
            email: userEmail,
            facebook: this.facebook,
            instagram: this.instagram,
            phonenumber: this.phonenumber,
            photoURL: firebase.auth().currentUser.photoURL,
          });

        var batch = db.batch();
        console.log(this.selectedClasses);
        this.selectedClasses.forEach((cls) => {
          var docRef = db
            .collection("Tutees")
            .doc(userEmail)
            .collection("Classes")
            .doc(cls.name);
          cls.p = false;
          cls.tutor = {};
          batch.set(docRef, cls);
        });
        batch.commit();
        this.$router.push("/");
      }
    },
    required(value) {
      if (value instanceof Array && value.length == 0) {
        return "Required.";
      }
      return !!value || "Required.";
    },
  },
  computed: {
    isValid() {
      return this.name != "" && this.selectedClasses.length != 0;
    },
  },
};
</script>

<style scoped>
.half {
  text-align: center;
  margin: auto;
  width: 50%;
}
h1 {
  color: #0947c4;
}
</style>
