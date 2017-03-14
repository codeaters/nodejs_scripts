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

//news values
var news = {
  color: "#FF00FF",
  content: "Let's launch ourselves into space",
  imgUrl: "https://media2.wnyc.org/i/620/372/c/80/photologue/photos/space.jpg",
  type:"notice",
  timestamp: Date.now()
};
//notification values
var title = "Launch Scheduled";
var text = "Countdown begins.";


var db = admin.database();
var ref = db.ref("news").push(news);

// See the "Defining the message payload" section below for details
// on how to define a message payload.
var payload = {
  data: {
    notificationType: "news_update",
    contentTitle: title,
    contentText: text
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
