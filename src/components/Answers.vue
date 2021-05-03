<template>
  <body>
    <div>
      <h1>Answers</h1>

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
          v-model="answer"
          name="input-7-1"
          filled
          label="Answer"
          placeholder="Answer"
          :rules="[() => !!answer || 'This field is required']"
          auto-grow
        ></v-textarea>
      </v-container>

      <v-btn color="primary" @click="onSubmit"> Post </v-btn>
      <v-btn color="primary" to="/questions"> Back </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    answer: "",
    title: "",
  }),
  computed: {},
  methods: {
    onSubmit() {
      let collectionName = "answer";
      firebase
        .firestore()
        .collection(collectionName)
        .doc()
        .set({ title: this.title, answer: this.answer });
    },
    async getData() {
      const snapshot = await firebase
        .firestore()
        .collection("answer")
        .get();
      const test = snapshot.docs.map((doc) => doc.data());
      console.log(test);
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>
