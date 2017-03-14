var admin = require('firebase-admin');
var serviceAccount = require("./technoweekapp-firebase-adminsdk-xu1cb-5f832fc66a.json");
var topic = "defaultTopic";
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// A template to update news
// Also sends a new_question notification
// As an admin, the app has access to read and write all data, regardless of Security Rules
var   leaderBoardEventName = "generalQuiz";
var title = "Leaderboard is here.";
var text = "Check out the leaderboard for "+leaderBoardEventName;
var quizId = "generalQuiz";


// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  data: {
    notificationType: "leaderboard_update",
    contentTitle: title,
    contentText: text,
    quiz_id: quizId
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
