<template>
  <div class="create-form">
    <h1>Ask a question</h1>

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

    <v-container fill-height fluid style="width: 50%">
      <v-textarea
        v-model="question"
        name="input-7-1"
        filled
        label="Ask a question"
        placeholder="Ask a question"
        auto-grow
      ></v-textarea>
    </v-container>

    <v-btn color="primary" @click="onSubmit"> post </v-btn>
  </div>
</template>

<script>
import firebase from "firebase";
export default {
  data: () => ({
    question: "",
    title: "",
  }),
  computed: {},
  methods: {
    onSubmit() {
      console.log("submit", this.firstName, this.classes);
      let collectionName = "question";

      firebase
        .firestore()
        .collection(collectionName)
        .doc()
        .set({ classes: this.classes });
    },
  },
};
</script>

<style scoped>
.create-form {
  text-align: center;
}
</style>
