<template>
  <div>
    <h1 class="text-center display-2 primary--text text-accent-3">
      Welcome to STEM Success!
    </h1>
    <h3 class="text-center display-2 primary-text text-accent-3">
      Please Sign In
    </h3>
    <section>
      <!-- <navigation></navigation> -->
      <!-- <h5 class="center-align">Login</h5> -->
      <!-- test -->
      <section id="firebaseui-auth-container"></section>
    </section>
  </div>
</template>

<script>
// import navigation from "@/components/NavBar.vue";
import firebase from "firebase";
import * as firebaseui from "firebaseui";
import "firebaseui/dist/firebaseui.css";
export default {
  name: "SignIn",
  data() {
    return {};
  },
  components: {},
  mounted() {
    let ui = firebaseui.auth.AuthUI.getInstance();
    if (!ui) {
      ui = new firebaseui.auth.AuthUI(firebase.auth());
    }
    var uiConfig = {
      signInSuccessUrl: "/", // This redirect can be achived by route using callback.
      signInFlow: "popup",
      signInOptions: [
        firebase.auth.GoogleAuthProvider.PROVIDER_ID,
        firebase.auth.FacebookAuthProvider.PROVIDER_ID,
        firebase.auth.EmailAuthProvider.PROVIDER_ID,
      ],
    };
    ui.start("#firebaseui-auth-container", uiConfig);
  },
};
</script>
