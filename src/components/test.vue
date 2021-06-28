<template>
  <div>
    <p>Exclusive</p>

    <v-btn-toggle v-model="toggle_exclusive">
      <v-btn>
        <v-icon>mdi-format-align-left</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-format-align-center</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-format-align-right</v-icon>
      </v-btn>

      <v-btn>
        <v-icon>mdi-format-align-justify</v-icon>
      </v-btn>
    </v-btn-toggle>
  </div>
</template>
<script>
export default {
  data() {
    return {
      toggle_exclusive: 1,
    };
  },
};
</script>
