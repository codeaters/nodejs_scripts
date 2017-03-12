var firebase = require('firebase');

var email = 'super.user@iw.com';
var password = 'fuckingA';

// Initialize Firebase
  var config = {
    apiKey: "AIzaSyCNwjh78oNoIkPN9xSJ6cWAid2gbGXI0dQ",
    authDomain: "technoweekapp.firebaseapp.com",
    databaseURL: "https://technoweekapp.firebaseio.com",
    storageBucket: "technoweekapp.appspot.com",
    messagingSenderId: "1012409695617"
  };

  firebase.initializeApp(config);

// authenticate
firebase.auth().signInWithEmailAndPassword(email, password).then(
  function(status){
    var user = firebase.auth().currentUser;
if (user) {
  console.log("User signed In");
  firebase.database().ref('/news').once('value').then(function(snapshot) {
  console.log(snapshot.val());
  // ...
});
}
  }
).catch(function(error) {
  // Handle Errors here.
  var errorCode = error.code;
  var errorMessage = error.message;

  console.log(error);
  // ...
});
