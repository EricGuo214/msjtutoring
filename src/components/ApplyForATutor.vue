<template>
  <body>
    <div class="half">
      <h1>Apply For A Tutor</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          dense
          :rules="[(v) => !!v || 'This field is required']"
          label="Full Name"
          outlined
          required
        ></v-text-field>

        <v-combobox
          v-model="selectedClasses"
          dense
          :items="classes"
          item-text="name"
          :rules="[required]"
          label="Select the classes you need help in"
          multiple
          chips
          :menu-props="{ maxHeight: '400' }"
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
              Sucess!
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
        <v-btn color="primary" @click="post" :disabled="!isValid">Submit</v-btn>
        <v-btn color="primary" @click="test">
          test
        </v-btn>
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

    notes: "",

    classes: [
      { header: "Sciences" },
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
      { divider: true },

      { header: "Languages" },
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

  methods: {
    post() {
      if (this.$refs.form.validate()) {
        firebase
          .firestore()
          .collection("Tutees")
          .doc()
          .set({
            name: this.name,
            classes: this.selectedClasses.map((a) => ({
              name: a.name,
              p: false,
            })),

            notes: this.notes,
          });
        this.name = "";
        this.selectedClasses = [];
        this.notes = "";
      }
    },
    test() {
      console.log(this.selectedClasses);
      console.log(
        this.selectedClasses.map((a) => ({ name: a.name, p: false }))
      );
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
