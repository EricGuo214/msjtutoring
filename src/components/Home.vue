<template>
  <v-row no-gutters>
    <v-img
      :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    >
      <v-theme-provider root>
        <v-container fill-height>
          <v-row align="center" class="white--text mx-auto" justify="center">
            <v-col class="white--text text-center" cols="12" tag="h1">
              <span
                :class="[
                  $vuetify.breakpoint.smAndDown ? 'display-1' : 'display-2',
                ]"
                class="font-weight-light"
              >
                WELCOME TO
              </span>

              <br />

              <span
                :class="[
                  $vuetify.breakpoint.smAndDown ? 'display-3' : 'display-4',
                ]"
                class="font-weight-black"
              >
                STEM Success
              </span>
            </v-col>
          </v-row>

          <v-row>
            <table class="centereds">
              <tr>
                <td class="pad">
                  <div
                    class="fancy-border"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <v-card
                      align="center"
                      width="344"
                      class="mx-auto"
                      outlined
                      style="background-color: transparent"
                    >
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-h5 mb-1"
                            style="opacity: 1; font-weight: bold; color: white"
                          >
                            Interested in teaching?
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-row
                        justify="center"
                        align="center"
                        style="padding-bottom: 20px"
                      >
                        <v-card-actions>
                          <v-btn
                            align-center
                            outlined
                            text
                            to="/ApplyToBeTutor"
                            style="color: white"
                            class="fancy-border isButton"
                          >
                            Apply to be a tutor
                          </v-btn>
                        </v-card-actions>
                      </v-row>
                    </v-card>
                  </div>
                </td>

                <td>
                  <div
                    class="fancy-border"
                    style="background-color: rgba(0, 0, 0, 0.5)"
                  >
                    <v-card
                      align="center"
                      class="mx-auto"
                      width="344"
                      outlined
                      style="background-color: transparent;"
                    >
                      <v-list-item three-line>
                        <v-list-item-content>
                          <v-list-item-title
                            class="text-h5 mb-1"
                            style="opacity: 1; font-weight: bold; color: white"
                          >
                            Need help?
                          </v-list-item-title>
                        </v-list-item-content>
                      </v-list-item>

                      <v-row
                        justify="center"
                        align="center"
                        style="padding-bottom: 20px"
                      >
                        <v-card-actions>
                          <v-btn
                            align-center
                            outlined
                            text
                            to="/ApplyForATutor"
                            style="color: white"
                            class="fancy-border isButton"
                          >
                            Find a tutor
                          </v-btn>
                        </v-card-actions>
                      </v-row>
                    </v-card>
                  </div>
                </td>
              </tr>
            </table>
          </v-row>
        </v-container>

        <v-container vertical-align:middle class="text-center">
          <v-responsive class="mx-auto mb-8" width="56">
            <v-divider class="mb-1"></v-divider>
          </v-responsive>
        </v-container>
      </v-theme-provider>
    </v-img>
    <v-container vertical-align:middle class="text-center">
      <h2 class="display-2 font-weight-bold mb-3">ABOUT US</h2>

      <v-responsive class="mx-auto mb-8" width="56">
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-responsive
        class="mx-auto title font-weight-light mb-8"
        max-width="720"
      >
        STEM Success is an organization where students get paired with
        personalized tutors. Our goal is to create an environment where students
        struggling in certain areas can get the best assistance available from
        their peers. We have bridged the gap between students looking for help
        and tutors looking to assist.
      </v-responsive>

      <v-avatar class="elevation-12 mb-12" size="128">
        <v-img src="./Pictures/MissionTutoringLogo.png"></v-img>
      </v-avatar>

      <div></div>
    </v-container>

    <v-parallax
      class="text-center"
      :height="$vuetify.breakpoint.smAndDown ? 700 : 500"
      style="width: 100%"
      src="https://www.wallpapertip.com/wmimgs/49-497241_study-hd-wallpaper-for-laptop.jpg"
    >
      <v-container fill-height class="text-center">
        <v-row class="mx-auto">
          <v-col v-for="[value, title] of stats" :key="title" cols="12" md="3">
            <div class="text-center">
              <div
                class="display-3 font-weight-black mb-4"
                v-text="value"
              ></div>

              <div
                class="title font-weight-regular text-uppercase"
                v-text="title"
              ></div>
            </div>
          </v-col>
        </v-row>
      </v-container>
    </v-parallax>
  </v-row>
</template>

<script>
export default {
  data() {
    return {
      stats: [
        ["40+", "STEM Classes"],
        ["50+", "Experienced Tutors"],
        ["100+", "Tutees"],
        ["6+", "Years of Experience"],
      ],
    };
  },
};
</script>

<style>
.centereds {
  margin-left: auto;
  margin-right: auto;
}

.pad {
  padding-right: 20px;
}

.fancy-border {
  border: 25px solid #b88846;
  border-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='75' height='75'%3E%3Cg fill='none' stroke='%23B88846' stroke-width='2'%3E%3Cpath d='M1 1h73v73H1z'/%3E%3Cpath d='M8 8h59v59H8z'/%3E%3Cpath d='M8 8h16v16H8zM51 8h16v16H51zM51 51h16v16H51zM8 51h16v16H8z'/%3E%3C/g%3E%3Cg fill='%23B88846'%3E%3Ccircle cx='16' cy='16' r='2'/%3E%3Ccircle cx='59' cy='16' r='2'/%3E%3Ccircle cx='59' cy='59' r='2'/%3E%3Ccircle cx='16' cy='59' r='2'/%3E%3C/g%3E%3C/svg%3E")
    25;
}
.transparent {
  background-color: rgba(255, 255, 255, 0.7);
}

.isButton {
  color: white;
}

.isButton:hover {
  background-color: rgba(265, 265, 265, 0.4);
}
</style>
