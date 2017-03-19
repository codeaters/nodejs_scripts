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
<<<<<<< HEAD
  color: "#FF0000",
  content: "We are updating the app. Please uninstall the app to stop receiving offending notifications, or ignore this message if you don't mind being offended.",
=======
  color: "#FF00FF",
  content: "Welcome to the Innovation Week, we are glad to see you here.",
>>>>>>> 633fe2dc4f1a6324fd24fba35402de6e6cbf526e
  imgUrl: "https://media2.wnyc.org/i/620/372/c/80/photologue/photos/space.jpg",
  type:"notice",
  timestamp: Date.now()
};
//notification values
<<<<<<< HEAD
var title = "App update in progress";
var text = "Please uninstall the app, we are doing some tesing with the notifications.";
=======
var title = "Welcome!";
var text = "Innovation week is almost here.";
>>>>>>> 633fe2dc4f1a6324fd24fba35402de6e6cbf526e


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
