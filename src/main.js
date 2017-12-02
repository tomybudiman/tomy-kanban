// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import * as firebase from "firebase";

firebase.initializeApp({
  apiKey: "AIzaSyDFE9GseYuS3BB4-5nP6Jwxjci29JKQN7c",
  authDomain: "tomy-kanban.firebaseapp.com",
  databaseURL: "https://tomy-kanban.firebaseio.com",
  projectId: "tomy-kanban",
  storageBucket: "",
  messagingSenderId: "473815272332"
});

Vue.config.productionTip = false
Vue.prototype.$database=firebase.database();

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: '<App/>',
  components: { App }
})
