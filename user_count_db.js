var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

var ref = admin.database().ref("users");


var count =0;
ref.on("child_added", function(snapshot) {
    count += 1;
   console.log(count);
  });