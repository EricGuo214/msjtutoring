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
        @click="debug()"
        v-for="q in questions"
        :key="q.id"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              {{ q.user.name }}
            </div>
            <v-list-item-title class="headline mb-1">
              {{ q.title }}
            </v-list-item-title>
            <v-list-item-subtitle>{{ q.question }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-bind="attrs"
                v-on="on"
                v-if="q.user.id == getCurID()"
                class="ma-2"
                text
                icon
                color="red lighten-2"
                @click.stop="remove(q.id)"
              >
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </template>
            Delete Question
          </v-tooltip>
        </v-card-actions>
      </v-card>

      <v-card class="mt-4">
        <v-card-text>
          <editable v-model="content"></editable>
          <editable v-model="content1" :max-length="35"></editable>
          <editable v-model="content2"></editable>
          <editable v-model="content3"></editable>
        </v-card-text>
      </v-card>

      <v-btn color="primary" to="/askquestion">
        Ask a question
      </v-btn>
    </div>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    questions: {},
  }),

  created() {
    const db = firebase.firestore();
    const ref = db.collection("questions");

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
        .collection("questions")
        .doc(x)
        .delete();
      console.log("remove");
    },

    getCurID() {
      return firebase.auth().currentUser.uid;
    },

    debug() {
      console.log("card clicked");
    },
  },
};
</script>

<style scoped>
body {
  text-align: center;
}
.centered {
  text-align: center;
}
</style>
