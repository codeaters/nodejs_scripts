var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// A template to set active question for a quiz, as well as setting start and end Time.
// Also sends a new_question notification
// As an admin, the app has access to read and write all data, regardless of Security Rules

var quizId = "thinkQuick";
var questionId = "q7";
var statement = "The area of a triangle withg sides of devices connected to the Internet of things have to communicate automatically, not via humans. What is this called?"; //the question statement
var expired = false;
var imgUri = ""; //an optional image
var options = {
  opt1:{
    value: "Bot to Bot (B2B)",
    correct: false
  },
  opt2:{
    value: "Skynet",
    correct: false
  },
  opt3:{
    value: "Machine to Machine (M2M)",
    correct: true
  },
  opt4:{
      value: "Intercloud",
    correct: false
  }
};

var db = admin.database();
var ref = db.ref(quizId+"/"+questionId);
if(imgUri.length > 0){
  ref.set({
    statement: statement,
    options: options,
    expired: expired,
    imgUri: imgUri
  }, function(status){
    console.log(status);
    console.log("Question set successfully");
  });
}
else{
  ref.set({
    statement: statement,
    options: options,
    expired: expired
  }, function(status){
    console.log(status);
    console.log("Question set successfully");
  });

}
