<template>
  <body>
    <div>
      <h1>Ask a question</h1>
      <v-form ref="form" v-model="valid" lazy-validation>
        <v-container fill-height fluid style="width: 50%">
          <v-text-field
            style="width: 50%"
            ref="title"
            v-model="title"
            dense
            :rules="[(v) => !!v || 'This field is required']"
            label="Title"
            outlined
            shaped
            required
          ></v-text-field>
        </v-container>

        <v-container fill-height fluid style="width: 50%">
          <v-textarea
            v-model="question"
            name="input-7-1"
            filled
            label="Ask a question"
            placeholder="Ask a question"
            :rules="[(v) => !!v || 'This field is required']"
            auto-grow
          ></v-textarea>
        </v-container>
      </v-form>

      <v-btn color="primary" @click="post" :disabled="!valid">
        POST
      </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    valid: true,
    question: "",
    title: "",
    User: {},
  }),
  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = { id: user.uid, name: user.displayName };
      }
    });
  },
  methods: {
    post() {
      if (this.$refs.form.validate()) {
        firebase
          .firestore()
          .collection("questions")
          .doc()
          .set({
            title: this.title,
            question: this.question,
            user: this.User,
          });
        this.$router.push("/questions");
      }
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>
