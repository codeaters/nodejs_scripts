var admin = require('firebase-admin');

var serviceAccount = require("./technoweekapp-firebase-adminsdk-xu1cb-5f832fc66a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// The topic name can be optionally prefixed with "/topics/".
var topic = "questionTopic";

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  data: {
    notificationType: "new_question",
    question_id: "q2",
    question_count: "2",
    quiz_name: "General Quiz",
    quiz_id: "generalQuiz",
    question_statement: "Who the fuck are you?"
  }
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().sendToTopic(topic, payload)
  .then(function(response) {
    // See the MessagingTopicResponse reference documentation for the
    // contents of response.
    console.log("Successfully sent message:", response);
  })
  .catch(function(error) {
    console.log("Error sending message:", error);
  });
