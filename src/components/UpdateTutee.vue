<template>
  <body>
    <div class="half">
      <h1>Apply For A Tutor! Update your information.</h1>
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

        <v-combobox
          v-model="selectedClasses"
          dense
          :items="classes"
          item-text="name"
          :rules="[required]"
          label="Select the classes you need help in"
          multiple
          chips
          hint="Or type in a class if it doesn't exsist"
          persistent-hint
          required
          return-object
        >
        </v-combobox>
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
                  :src="`https://cdn.iconscout.com/icon/free/png-256/facebook-logo-2019-1597680-1350125.png`"
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
                  :src="`https://i.pinimg.com/736x/c8/95/2d/c8952d6e421a83d298a219edee783167.jpg`"
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
        <v-btn color="primary" @click="post"> Post</v-btn>
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
    selectedClasses: [],
    phonenumber: null,
    facebook: "",
    instagram: "",
    notes: "",
    gender: "",
    genders: ["Male", "Female", "Other"],

    classes: [
      { header: "Sciences" },
      { divider: true },
      { name: "AP Biology" },
      { name: "AP Chemistry" },
      { name: "AP Computer Science A" },
      { name: "AP Physics 1" },
      { name: "AP Physics C" },
      { name: "Physics" },
      { name: "Physics in the Universe" },
      { name: "Biology" },
      { name: "Chemistry" },
      { name: "Living Earth" },

      { header: "Languages" },
      { divider: true },

      { name: "AP Spanish" },
      { name: "AP Chinese" },
      { divider: true },

      { header: "Maths" },
      { name: "AP Statistics" },
      { name: "AP Calculus AB" },
      { name: "AP Calculus BC" },
      { name: "Calculus" },
      { name: "Precalculus" },
      { name: "Algebra 2/Trig" },
      { name: "Algebra 2" },
      { name: "Trig" },
      { name: "Geometry" },
    ],
  }),

  created(){
      firebase
        .firestore()
        .collection("Tutees")
        .doc(firebase.auth().currentUser.email)
        .onSnapshot((doc) => {
          var tuteeInfo = doc.data();
          this.name = tuteeInfo.name;
          this.phonenumber = tuteeInfo.phonenumber;
          this.facebook = tuteeInfo.facebook;
          this.notes = tuteeInfo.notes;
          this.gender = tuteeInfo.gender;
          this.grade = tuteeInfo.grade;
          this.instagram = tuteeInfo.instagram;
          this.maxTut = tuteeInfo.maxTut;
        });

      firebase
        .firestore()
        .collection("Tutees")
        .doc(firebase.auth().currentUser.email)
        .collection("Classes")
        .get()
        .then((querySnapshot) => {
            var classNames = []
            querySnapshot.forEach((doc) => {
                console.log("Document data:", doc.data())
                classNames.push(doc.data().name)
            })
            this.selectedClasses = classNames
        })
  },

  methods: {
    post() {
      if (this.$refs.form.validate()) {
        const userEmail = firebase.auth().currentUser.email;
        var db = firebase.firestore();
        db.collection("Tutees")
          .doc(userEmail)
          .set({
            name: this.name,
            notes: this.notes,
            email: userEmail,
            phonenumber: this.phonenumber,
            facebook: this.facebook,
            instagram: this.instagram,
          });
        var batch = db.batch();
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
        // this.name = "";
        // this.selectedClasses = [];
        // this.notes = "";
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
</style>
