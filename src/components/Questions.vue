<template>
  <body>
    <div>
      <v-card
        class="mx-auto"
        max-width="344"
        outlined
        @click="active = true"
        v-for="q in questions"
        :key="q"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <v-list-item-title class="headline mb-1">
              {{ q.title }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ q.question }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-btn
            class="ma-2"
            text
            icon
            color="red lighten-2"
            @click="remove(q.id)"
          >
            <v-icon>mdi-close-thick</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>

      <v-btn color="primary" to="/askquestion">
        Ask a question
      </v-btn>

      <v-btn @click="onSubmit">
        get info
      </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";
export default {
  // mounted() {
  //   var self = this;
  //   firebase
  //     .firestore()
  //     .collection("question")
  //     .get()
  //     .then((v) => {
  //       self.questions = v.docs.map((doc) => {
  //         let robj = doc.data();
  //         robj["id"] = doc.id;
  //         return robj;
  //       });
  //     });
  // },
  data: () => ({
    questions: {},
  }),
  created() {
    const db = firebase.firestore();
    const ref = db.collection("question");

    ref.onSnapshot((querySnapshot) => {
      var fArray = [];
      querySnapshot.forEach((doc) => {
        let f = doc.data();
        f.id = doc.id;
        fArray.push(f);
      });
      this.questions = fArray;
    });
  },
  computed: {},
  methods: {
    remove(x) {
      firebase
        .firestore()
        .collection("question")
        .doc(x)
        .delete();
    },

    onSubmit() {
      // firebase
      //   .firestore()
      //   .collection("question")
      //   .get()
      //   .then((v) => {
      //     v.docs.map((doc) => console.log(doc.id));
      //   });
      const parsedobj = JSON.parse(JSON.stringify(this.questions));
      console.log(parsedobj);
      for (const d in parsedobj) {
        console.log(d);
      }
      // console.log(parse);
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
</style>
