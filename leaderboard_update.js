var admin = require('firebase-admin');

var serviceAccount = require("./technoweekapp-firebase-adminsdk-xu1cb-5f832fc66a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

// Get a database reference to our response node
var db = admin.database();
var ref = db.ref("response/generalQuiz");

// Attach an asynchronous callback to read the data at our posts reference
ref.on("child_added", function(snapshot) {
  console.log(snapshot.val());
}, function (errorObject) {
  console.log("The read failed: " + errorObject.code);
});
