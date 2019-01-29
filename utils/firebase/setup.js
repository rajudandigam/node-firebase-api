const firebase = require('firebase');

const config = {
  apiKey: "AIzaSyBmGY4BwcNbF3-mqyoq1ELkL7vdhVF7WnM",
  authDomain: "nodefirebaseapi.firebaseapp.com",
  databaseURL: "https://nodefirebaseapi.firebaseio.com",
  projectId: "nodefirebaseapi",
  storageBucket: "nodefirebaseapi.appspot.com",
  messagingSenderId: "541916016298"
};

firebase.initializeApp(config);

module.exports = firebase;