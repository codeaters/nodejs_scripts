var admin = require('firebase-admin');
var serviceAccount = require("./serviceAccountKey.json");
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
  content: "Welcome to the Innovation Week, we are glad to see you here.",
  imgUrl: "https://media2.wnyc.org/i/620/372/c/80/photologue/photos/space.jpg",
  type:"notice",
  timestamp: Date.now()
};
//notification values
var title = "Welcome!";
var text = "Innovation week is almost here.";


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
