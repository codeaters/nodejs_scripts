var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// A template to set active question for a quiz, as well as setting start and end Time.
// Also sends a new_question notification
// As an admin, the app has access to read and write all data, regardless of Security Rules


var quizId = "quizzer";
var questionId = "q3";
var statement = "Question Sattement"; //the question statement
var fibAnswer = "fibAnswer"; //the correct answer
var expired = false;
var imgUri = ""; //an optional image







var db = admin.database();
var ref = db.ref(quizId+"/"+questionId);

ref.set({
  statement: statement,
  fibAnswer: fibAnswer,
  expired: expired
//  ,imgUri: imgUri
}, function(status){
  console.log(status);
  console.log("Question set successfully");
});