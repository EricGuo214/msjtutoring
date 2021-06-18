<template>
  <body>
    <div class="half">
      <h1>Find a Tutor</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-text-field
          v-model="name"
          dense
          :rules="[(v) => !!v || 'This field is required']"
          label="Name"
          outlined
          required
        ></v-text-field>

        <v-autocomplete
          v-model="selectedClasses"
          dense
          :rules="[(v) => !!v || 'This field is required']"
          :items="classes"
          :menu-props="{ maxHeight: '400' }"
          label="Select the classes you need help in"
          multiple
          chips
          required
        >
          <template v-slot:item="data">
            <template>
              <v-list-item-content v-text="data.item"></v-list-item-content>
            </template>
          </template>
        </v-autocomplete>
        <br />
        <v-text-field
          v-model="notes"
          label="Any preferences or notes for your tutor? (optional)"
          outlined
        ></v-text-field>

        <v-dialog v-model="dialog" width="500">
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
        </v-dialog>
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
      "AP Biology",
      "AP Chemistry",
      "AP Computer Science A",
      "AP Physics",
      "Physics",
      "Physics in the Universe",
      "Biology",
      "Chemistry",
      "Living Earth",
      { divider: true },

      { header: "Languages" },
      "AP Spanish",
      "AP Chinese",
      { divider: true },

      { header: "Maths" },
      "AP Statistics",
      "AP Calculus AB",
      "AP Calculus BC",
      "Calculus",
      "Precalculus",
      "Algebra 2/Trig",
      "Algebra 2",
      "Trig",
      "Geometry",
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
            classes: this.selectedClasses,
            notes: this.notes,
          });
      }
      
    },
  },
  computed: {
    isValid() {
      return (this.name != "" && this.selectedClasses.length != 0)
    }
  }
};
</script>

<style scoped>
.half {
  text-align: center;
  margin: auto;
  width: 50%;
}
</style>
