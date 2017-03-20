var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');
var crypto = require('crypto');

var users=[];

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});


  /*push users to firebase auth*/
  admin.auth().createUser({
    uid: "107127",
    email: "rajeev.arora@iw.com",
    emailVerified: true,
    password: "",
    displayName: "Rajeev Arora",
    disabled: false
  }).then(function(userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
      users.push(userRecord);

    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });
