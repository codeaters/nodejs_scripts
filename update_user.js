var admin = require("firebase-admin");

var serviceAccount = require("./technoweekapp-firebase-adminsdk-xu1cb-5f832fc66a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});


var email = 'j.f@iw.com';

admin.auth().getUserByEmail(email)
  .then(function(userRecord) {
    // See the UserRecord reference doc for the contents of userRecord.
    console.log("Successfully fetched user data:", userRecord.toJSON());
    admin.auth().updateUser(userRecord.uid, {
      email: "j.f@iw.com",
      emailVerified: true,
      password: "fuckingA",
      displayName: "John Farter",
      photoURL: "http://www.example.com/12345678/photo.png",
      disabled: false
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
