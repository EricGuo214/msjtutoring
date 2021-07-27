<template>
  <body>
    <h1>Your Profile</h1>

    <v-container class="half">
      <v-row>
        <div class="text-center">
          <div class="my-2">
            <v-btn color="primary" to="/UpdateTutor">
              Update Tutor Information
            </v-btn>
          </div>
          <div class="my-2">
            <v-btn color="primary" to="/UpdateTutee">
              Update Tutee Information
            </v-btn>
          </div>
        </div>
      </v-row>
    </v-container>
  </body>
</template>

<style scoped>
.half {
  text-align: center;
  margin: auto;
}
</style>
