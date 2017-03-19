var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');
var HashMap = require('hashmap');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

var ref = admin.database().ref('users');

 ref.child('681400').set({
                  username: "tauseef.khan",
                  name: "Tauseef Khan",
                  team: "DF - PS - GL"
              }, function(error){
                  if(!error){
                      console.log("Error creating user in Realtime Database"+ error);
                  }});
