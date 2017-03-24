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
var questionId = "q5";
var statement = "A non-Abelian group walks into a bar. The Bartender asks: Did you take the bus? The group replies, I don't __________"; //the question statement
var fibAnswer = "commute"; //the correct answer
var expired = false;
var imgUri = "http://brownsharpie.courtneygibbons.org/wp-content/comics/2006-11-08-the-non-abelian-grape.jpg"; //an optional image







var db = admin.database();
var ref = db.ref(quizId+"/"+questionId);

ref.set({
  statement: statement,
  fibAnswer: fibAnswer,
  expired: expired
  ,imgUri: imgUri
}, function(status){
  console.log(status);
  console.log("Question set successfully");
});
