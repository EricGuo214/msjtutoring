<template>
  <div>
    <v-card class="mx-auto" max-width="344" outlined>
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ this.question.user.name }}
          </div>
          <v-list-item-title class="headline mb-1">
            {{ question.title }}
          </v-list-item-title>
          <v-list-item-subtitle>{{ question.question }}</v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item> </v-card
    >>

    <v-container fill-height fluid style="width: 50%">
      <v-textarea
        v-model="reply"
        name="input-7-1"
        filled
        label="Answer this question"
        placeholder="Answer this question"
        :rules="[() => !!question || 'This field is required']"
        auto-grow
      ></v-textarea>
    </v-container>

    <v-card
      class="mx-auto"
      max-width="800"
      outlined
      v-for="q in replies"
      :key="q.id"
    >
      <v-list-item three-line>
        <v-list-item-content>
          <div class="overline mb-4">
            {{ q.user.name }}
          </div>
          <v-text-field
            v-if="wasAuthor(q) && q.isEditing"
            type="text"
            outlined
            placeholder="Edit reply"
            label="Edit reply"
            v-model="q.reply"
            :disabled="!q.isEditing"
            :class="{ view: !q.isEditing }"
            class="headline mb-1"
          >
          </v-text-field>

          <v-list-item-title v-else class="headline mb-1">
            {{ q.reply }}
          </v-list-item-title>
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
          <v-btn v-if="q.isEditing" text icon @click="save(q.id, q.reply)"
            >Save</v-btn
          >
          <v-icon v-else>mdi-pencil</v-icon>
        </v-btn>
      </v-card-actions>
    </v-card>

    <div class="centered">
      <v-btn color="primary" @click="post">
        POST
      </v-btn>
      <v-btn color="primary" to="/questions">
        Back
      </v-btn>
    </div>
  </div>
</template>

<script>
import firebase from "firebase";

export default {
  data() {
    return {
      qID: this.$route.params.id,
      question: {},
      reply: "",
      replies: {},
      User: {},
    };
  },

  created() {
    firebase.auth().onAuthStateChanged((user) => {
      if (user) {
        this.User = { id: user.uid, name: user.displayName };
      }
    });
    const db = firebase.firestore();
    var docRef = db.collection("questions").doc(this.qID);
    docRef
      .get()
      .then((doc) => {
        if (doc.exists) {
          this.question = doc.data();
        } else {
          // doc.data() will be undefined in this case
          console.log("No such document!");
        }
      })
      .catch((error) => {
        console.log("Error getting document:", error);
      });

    const ref = docRef.collection("replies");
    ref.onSnapshot((querySnapshot) => {
      var fArray = [];
      querySnapshot.forEach((doc) => {
        let f = doc.data();
        f.id = doc.id;
        f.isEditing = false;
        fArray.push(f);
      });
      this.replies = fArray;
    });
  },
  computed: {},
  methods: {
    post() {
      firebase
        .firestore()
        .collection("questions")
        .doc(this.qID)
        .collection("replies")
        .doc()
        .set({ reply: this.reply, user: this.User });
    },
    remove(x) {
      firebase
        .firestore()
        .collection("questions")
        .doc(this.qID)
        .collection("replies")
        .doc(x)
        .delete();
      console.log("remove");
    },

    wasAuthor(q) {
      return q.user.id == firebase.auth().currentUser.uid;
    },
    save(id, newR) {
      firebase
        .firestore()
        .collection("questions")
        .doc(this.qID)
        .collection("replies")
        .doc(id)
        .update({
          reply: newR,
        });
    },

    debug() {
      console.log(this.questions);
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
