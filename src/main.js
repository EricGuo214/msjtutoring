import Vue from 'vue'
import App from './App.vue'
import vuetify from './plugins/vuetify';
import firebase from 'firebase'
import router from './router'

Vue.config.productionTip = false

const firebaseConfig = {
  apiKey: "AIzaSyALaIRlOMt8cTbBrzOhrFZz5vLO8YGV9Kk",
  authDomain: "msj-tutor.firebaseapp.com",
  projectId: "msj-tutor",
  storageBucket: "msj-tutor.appspot.com",
  messagingSenderId: "910357633256",
  appId: "1:910357633256:web:bfd756e7077398296e515d",
  measurementId: "G-TF7RDVBFZG"
};

firebase.initializeApp(firebaseConfig);

new Vue({
  vuetify,
  router,
  render: h => h(App)
}).$mount('#app')
