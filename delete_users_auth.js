var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

lri=lineReader.createInterface({
  input: fs.createReadStream('./userdetails_uploaded.txt')
});




lri.on('line', function (line) {
  words = line.split(',');
admin.auth().deleteUser(words[0])
  .then(function() {
    console.log("Successfully deleted user");
  })
  .catch(function(error) {
    console.log("Error deleting user:", error);
  });

});



  //var userRef = admin.database().ref('users');
