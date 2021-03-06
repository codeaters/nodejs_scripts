var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// A template to set active question for a quiz, as well as setting start and end Time.
// Also sends a new_question notification
// As an admin, the app has access to read and write all data, regardless of Security Rules

var quizName = "Quizzer";
var quizId = "dummy";
var currentQuestion = "q1";
var ttl = 60; //minutes

var db = admin.database();
var ref = db.ref("currentQuestion/"+quizId);
var questionRef = db.ref(quizId+"/"+currentQuestion);



ref.set(currentQuestion, function(status){
  console.log(status);
  console.log("Current Question updated successfully");

  //update start and end time in the question tree
  var time = new Date().getTime();
  questionRef.update({
    startTime: time,
    endTime: time + ttl*60000,
    expired: false,
    maxTime: ttl
  }, function(status){
    console.log(status);
    console.log("Start and End time set in question tree");
    console.log("Sending notification to devices.");

    //retrieve the question statement
    questionRef.once('value', function(snapshot){
      var question = snapshot.val();
      // The topic name can be optionally prefixed with "/topics/".
      var topic = "defaultTopic";

      console.log("Question is: "+JSON.stringify(question));

      // See the "Defining the message payload" section below for details
      // on how to define a message payload.
      var payload = {
        notification:{
          time_to_live: String(ttl * 60)
        },

        data: {
          notificationType: "new_question",
          question_id: currentQuestion,
          question_count: currentQuestion.split('q')[1],
          quiz_name: quizName,
          quiz_id: quizId,
          question_statement: "Click to see the Question."
        }
      };

      // Send a message to devices subscribed to the provided topic./*
      /*admin.messaging().sendToTopic(topic, payload)
        .then(function(response) {
          // See the MessagingTopicResponse reference documentation for the
          // contents of response.
          console.log("Successfully sent message:", response);
        })
        .catch(function(error) {
          console.log("Error sending message:", error);
        });*/
    });
  });
});
