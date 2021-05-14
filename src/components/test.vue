<template>
  <div class="notifications" v-if="show">
    <v-layout>
      <v-flex xs12 sm6 offset-sm3>
        <v-card flat color="green">
          <v-card-title primary-title>
            <div>
              <h3 class="headline">Neu Benutzer angelegt</h3>
              <div>{{ card_text }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <div class="close"><v-btn @click="removeMessage(2)">Ok</v-btn></div>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </div>
</template>

<script>
export default {
  data() {
    return {
      card_text: "Success!",
      show: true,
    };
  },
  methods: {
    removeMessage(seconds) {
      setTimeout(() => (this.show = false), seconds * 1000);
    },
  },
};
</script>
