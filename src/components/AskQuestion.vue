<template>
  <body>
    <div>
      <h1>Ask a question</h1>

      <v-container fill-height fluid style="width: 50%">
        <v-text-field
          style="width: 50%"
          ref="title"
          v-model="title"
          dense
          :rules="[() => !!title || 'This field is required']"
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
          :rules="[() => !!question || 'This field is required']"
          auto-grow
        ></v-textarea>
      </v-container>

      <v-btn color="primary" @click="post">
        POST
      </v-btn>

      <v-btn color="primary" to="/questions"> Back </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";
var user = firebase.auth().currentUser;

export default {
  data: () => ({
    question: "",
    title: "",
    User: { id: user.uid, name: user.displayName },
  }),
  computed: {},
  methods: {
    post() {
      if (user) {
        firebase
          .firestore()
          .collection("questions")
          .doc()
          .set({
            title: this.title,
            question: this.question,
            user: this.User,
          });
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
