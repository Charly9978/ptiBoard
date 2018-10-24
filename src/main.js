import Vue from 'vue'
import './plugins/vuetify'
import App from './App.vue'
//import router from './router'
import firebase from 'firebase';
// Required for side-effects
require("firebase/firestore");

var config = {
  apiKey: "AIzaSyDZh6FsTQKJxGsL91efEslNP-ZtzN01ZhM",
  authDomain: "ev07pti.firebaseapp.com",
  databaseURL: "https://ev07pti.firebaseio.com",
  projectId: "ev07pti",
  storageBucket: "ev07pti.appspot.com",
  messagingSenderId: "935303166728"
};
firebase.initializeApp(config);

// Initialize Cloud Firestore through Firebase
export const db = firebase.firestore();

Vue.config.productionTip = false

new Vue({
  //router,
  render: h => h(App)
}).$mount('#app')
