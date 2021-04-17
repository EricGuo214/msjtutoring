<template>
  <body>
    <div>

      <h1>
        Questions
      </h1>

      <v-card
        class="mx-auto"
        max-width="800"
        outlined
        v-for="q in questions"
        :key="q.questions"
        @click="active = true"
        to = "/replies"
      >

        <v-list-item three-line>
          <v-list-item-content>
            <!-- <div class="overline mb-4">
              OVERLINE
            </div> -->
            <v-list-item-title class="headline mb-1">
              {{ q.title }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ q.question }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-card>

      <v-btn color="primary" to="/askquestion" @click="onSubmit">
        Ask a question
      </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";
export default {
  mounted() {
    // firebase
    //   .ref("msj-tutor")
    //   .once("value")
    //   .then((dataSnapshot) => {
    //     this.questions = dataSnapshot.val();
    //   });
    var self = this;
    firebase
      .firestore()
      .collection("question")
      .get()
      .then((v) => {
        self.questions = v.docs.map((doc) => doc.data());
      });
  },
  data: () => ({
    questions: {},
  }),
  computed: {},
  methods: {
    onSubmit() {
      var parsedobj = JSON.parse(JSON.stringify(this.questions));
      console.log(parsedobj);
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
.centered{
  text-align: center;
}
</style>
