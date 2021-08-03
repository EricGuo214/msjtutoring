<template>
  <body>
    <div class="half">
      <h1>Edit Tutee</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="info.name"
          dense
          :rules="[(v) => !!v || 'This field is required']"
          label="Full name"
          outlined
          required
        ></v-text-field>

        <v-col>
          <v-text-field
            v-model.number="info.phonenumber"
            type="number"
            label="Phone Number"
            :rules="[(v) => !!v || 'This field is required']"
          >
          </v-text-field>
        </v-col>

        <v-select
          return-object
          v-model="selectedClasses"
          dense
          :items="classes"
          item-text="name"
          :rules="[required]"
          label="Select the classes you need help in"
          multiple
          chips
          required
        >
        </v-select>
        <v-alert dense border="left" type="warning">
          Classes <strong>cannot </strong> be changed if you paired are with a
          tutor. Please check your inbox or contact us at
          msjstemsuccess@gmail.com to remove or add classes
        </v-alert>
        <br />
        <v-text-field
          v-model="info.notes"
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

        <v-btn color="primary" @click="save"> save</v-btn>
        <v-btn color="primary" @click="test"> test</v-btn>
        <!-- <v-btn color="warning" @click="clearClass"> delete class</v-btn> -->
      </v-form>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    valid: true,
    info: {},
    selectedClasses: [],
    genders: ["Male", "Female", "Other"],

    classes: [
      { header: "Sciences" },
      { divider: true },
      { name: "AP Biology" },
      { name: "AP Chemistry" },

      { name: "AP Physics 1" },
      { name: "AP Physics C" },
      { name: "CP Physics" },
      { name: "Physics in the Universe" },
      { name: "Biology" },
      { name: "Chemistry" },
      { name: "Living Earth" },
      { divider: true },

      { header: "Maths" },
      { divider: true },
      { name: "AP Statistics" },
      { name: "AP Computer Science A" },
      { name: "AP Calculus AB" },
      { name: "AP Calculus BC" },
      { name: "CP Calculus" },
      { name: "Precalculus" },
      { name: "Algebra 2/Trig" },
      { name: "Algebra 2" },
      { name: "Trigonometry" },
      { name: "Geometry" },
    ],
  }),

  created() {
    var db = firebase.firestore();
    const userEmail = firebase.auth().currentUser.email;
    db.collection("Tutees")
      .doc(userEmail)
      .get()
      .then((doc) => {
        this.info = doc.data();
      });

    db.collection("Tutees")
      .doc(userEmail)
      .collection("Classes")
      .get()
      .then((querySnapshot) => {
        querySnapshot.forEach((doc) => {
          this.selectedClasses.push(doc.data());
        });
        this.selectedClasses.forEach((cls) => {
          if (cls.p) {
            this.classes[this.getInd(cls.name)].disabled = true;
          }
        });
      });
  },

  methods: {
    test() {},
    getInd(n) {
      for (var i = 0; i < this.classes.length; i++) {
        if (this.classes[i].name == n) return i;
      }
    },

    save() {
      if (this.$refs.form.validate()) {
        var db = firebase.firestore();
        const userEmail = firebase.auth().currentUser.email;

        db.collection("Tutees")
          .doc(userEmail)
          .set(this.info);

        var batch = db.batch();
        db.collection("Tutees")
          .doc(userEmail)
          .collection("Classes")
          .where("p", "==", false)
          .get()
          .then((res) => {
            res.forEach((element) => {
              element.ref.delete();
            });
          })
          .then(() => {
            this.selectedClasses.forEach((cls, index, arr) => {
              var docRef = db
                .collection("Tutees")
                .doc(userEmail)
                .collection("Classes")
                .doc(cls.name);

              docRef.get().then((doc) => {
                if (doc.exists) {
                  console.log("exists");
                } else {
                  cls.p = false;
                  cls.tutor = {};
                  batch.set(docRef, cls);
                }
                if (index == arr.length - 1) batch.commit();
              });
            });
          });

        // this.selectedClasses.forEach((cls, index, arr) => {
        //   var docRef = db
        //     .collection("Tutees")
        //     .doc(userEmail)
        //     .collection("Classes")
        //     .doc(cls.name);

        //   docRef.get().then((doc) => {
        //     if (doc.exists) {
        //       this.toDelete[cls.name] = false;
        //     } else {
        //       cls.p = false;
        //       cls.tutor = {};
        //       batch.set(docRef, cls);
        //     }
        //     if (index == arr.length - 1) {
        //       batch.commit();
        //       console.log(this.toDelete);
        //       for (const cls in this.toDelete) {
        //         console.log(this.toDelete[cls]);

        //         if (this.toDelete[cls]) {
        //           console.log(`${cls} marked to del`);

        //           db.collection("Tutees")
        //             .doc(userEmail)
        //             .collection("Classes")
        //             .doc(cls)
        //             .delete();
        //           console.log("deleted cls");
        //         }
        //       }
        //     }
        //   });
        // });
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
