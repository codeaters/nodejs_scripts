var admin = require("firebase-admin");

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});


var email = 'danish.kamal@iw.com';

admin.auth().getUserByEmail(email)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
    admin.auth().updateUser(userRecord.uid, {
      password: "abcdef"
    })
      .then(function(userRecord) {
        // See the UserRecord reference doc for the contents of userRecord.
        console.log("Successfully updated user", userRecord.toJSON());
      })
      .catch(function(error) {
        console.log("Error updating user:", error);
      });
  })
  .catch(function(error) {
    console.log("Error fetching user data:", error);
  });
