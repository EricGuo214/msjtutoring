<template>
  <body>
    <div>
      <h1 class="centered">
        Questions
      </h1>

      <v-text-field
        v-model="search"
        append-icon="mdi-magnify"
        label="Search keywords"
        single-line
        hide-details
        style="width: 50%"
        class="mx-auto"
      ></v-text-field>
      <br/>
      <div class="centered">
        <v-btn color="primary" to="/askquestion">
          Ask a question
        </v-btn>
      </div>
      <br/>
      <v-card
        class="mx-auto"
        max-width="600"
        outlined
        v-for="q in filtQ"
        :key="q.id"
        :to="{ name: 'Replies', params: { id: q.id } }"
      >
        <v-list-item three-line>
          <v-list-item-content>
            <div class="overline mb-4">
              {{ q.user.name }}
            </div>
            <v-text-field
              @click.prevent
              v-if="wasAuthor(q) && q.isEditing"
              placeholder="Edit title"
              label="Edit title"
              type="text"
              outlined
              v-model="q.title"
              :disabled="!q.isEditing"
              :class="{ view: !q.isEditing }"
              class="headline mb-1"
            >
            </v-text-field>

            <v-list-item-title v-else class="headline mb-1 centered">
              {{ q.title }}
            </v-list-item-title>

            <v-text-field
              @click.prevent
              v-if="wasAuthor(q) && q.isEditing"
              placeholder="Edit question"
              label="Edit question"
              type="text"
              outlined
              v-model="q.question"
              :disabled="!q.isEditing"
              :class="{ view: !q.isEditing }"
              class="headline mb-1"
            >
            </v-text-field>

            <v-list-item-subtitle v-else>{{ q.question }}</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-card-actions>
          <v-tooltip bottom>
            <template v-slot:activator="{ on, attrs }">
              <v-btn
                v-if="wasAuthor(q)"
                v-bind="attrs"
                v-on="on"
                class="ma-2"
                text
                icon
                color="red lighten-2"
                @click.prevent="remove(q.id)"
              >
                <v-icon>mdi-close-thick</v-icon>
              </v-btn>
            </template>
            <span>Delete</span>
          </v-tooltip>

          <v-btn
            v-if="wasAuthor(q)"
            text
            icon
            @click.prevent="q.isEditing = !q.isEditing"
          >
            <v-btn
              v-if="q.isEditing"
              text
              icon
              @click="save(q.id, q.title, q.question)"
              >Save</v-btn
            >
            <v-icon v-else>mdi-pencil</v-icon>
          </v-btn>
        </v-card-actions>
      </v-card>
      <br />

    </div>
  </body>
</template>

<script>
import firebase from "firebase";

export default {
  data: () => ({
    questions: [],
    search: "",
  }),

  created() {
    firebase
      .firestore()
      .collection("questions")
      .onSnapshot((querySnapshot) => {
        var fArray = [];
        querySnapshot.forEach((doc) => {
          let f = doc.data();
          f.id = doc.id;
          f.isEditing = false;
          fArray.push(f);
        });
        this.questions = fArray;
      });
  },
  computed: {
    filtQ: function() {
      return this.questions.filter((q) => {
        return (
          q.title.toLowerCase().match(this.search.toLowerCase()) ||
          q.question.toLowerCase().match(this.search.toLowerCase())
        );
      });
    },
  },
  methods: {
    remove(x) {
      const db = firebase.firestore();
      db.collection("questions")
        .doc(x)
        .delete();

      db.collection("questions")
        .doc(x)
        .collection("replies")
        .get()
        .then((res) => {
          res.forEach((element) => {
            element.ref.delete();
          });
        });
    },

    wasAuthor(q) {
      return q.user.id == firebase.auth().currentUser.uid;
    },
    save(id, newTitle, newQ) {
      firebase
        .firestore()
        .collection("questions")
        .doc(id)
        .update({
          title: newTitle,
          question: newQ,
        });
    },

    debug() {
      console.log(this.questions);
    },
  },
};
</script>

<style scoped>
/* body {
  text-align: center;
} */

.centered {
  text-align: center;
}
</style>
