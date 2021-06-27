<template>
  <v-row no-gutters>
    <v-img
      :min-height="'calc(100vh - ' + $vuetify.application.top + 'px)'"
      src="https://images.unsplash.com/photo-1507842217343-583bb7270b66?ixid=MnwxMjA3fDB8MHxzZWFyY2h8MXx8bGlicmFyeSUyMGJhY2tncm91bmR8ZW58MHx8MHx8&ixlib=rb-1.2.1&w=1000&q=80"
    >
      <v-theme-provider dark>
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
                Mission Tutoring
              </span>
            </v-col>
          </v-row>
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
        Mission Tutoring is a website where students get paired with
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
    <v-container vertical-align: middle class="text-center">
      <h2 class="display-2 font-weight-bold mb-3">MEET THE CREATORS</h2>

      <v-responsive class="mx-auto mb-12" width="56">
        <v-divider class="mb-1"></v-divider>

        <v-divider></v-divider>
      </v-responsive>

      <v-row>
        <v-col
          v-for="({ image, title, text }, i) in authors"
          :key="i"
          cols="12"
          md="3"
        >

          <v-card class="py-12 px-4" color="grey lighten-5" flat>
            <v-theme-provider dark>
              <div>
                <v-avatar size="88">
                  <img :src="image" />
                </v-avatar>
              </div>
            </v-theme-provider>

            <v-card-title
              class="justify-center font-weight-black text-uppercase"
              v-text="title"
            ></v-card-title>

            <v-card-text class="subtitle-1" v-text="text"> </v-card-text>
          </v-card>
        </v-col>
      </v-row>
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
      authors: [
        {
          image: require("./Pictures/david.jpg"),
          title: "David Guo",
          text: "Nice to meet you! I created and led MSJ tutoring because I wanted to create a tool that would help struggling students and encourage kindness. With MSJ Tutoring, exceptional students are given the oppurtunity to gain experience in teaching and struggling students can learn from their successful peers. My hobbies are dancing, running, and playing the piano!",
        },
        {
          image: require("./Pictures/RithPic.jpg"),
          title: "Rithwik Vaidun",
          text: "Hey! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I love to spread myknowledge with other people. I didn't want there to be a barrier for people like me to not to be able to help and teach people.In my spare time I love to run and play sports, especially table tennis.",
        },
        {
          image: require("./Pictures/ankith_pic.png"),
          title: "Ankith Bachhu",
          text: "Hello! I am currently 16 years old and a junior at Mission San Jose High. I joined MSJ tutoring because I wanted to give people an opportunity to get help if they needed it. I wanted to spread my knowledge with the community. I hope that anyone who uses this website will find academic success. In my spare time I love to code and run.",
        },
        {
          image: require("./Pictures/ericPic.jpeg"),
          title:"Eric Guo",
          text: "I joined MSJ tutoring to improve Mission San Jose High School's student experiences in challenging courses. My goal is to develop a website that benefits all participants with meaningful experiences and a sense of community. I hope that everybody who uses this website achieves their desired results! I enjoy dancing, reading, and exercise."
        },
      ],
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
