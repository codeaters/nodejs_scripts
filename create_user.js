var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');
var crypto = require('crypto');

var users=[];

var serviceAccount = require("./technoweekapp-firebase-adminsdk-xu1cb-5f832fc66a.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

lri=lineReader.createInterface({
  input: fs.createReadStream('./userlist.csv')
});

lri.on('line', function (line) {
  words = line.split(',');
  user = {};
  user.uid = '';
  user.firstname = words[1];
  user.lastname = words[2];
  user.email = words[1]+'.'+words[2]+'@iw.com';
  user.displayName =  words[1]+' '+words[2];
  user.password = first;
  /*push users to firebase auth*/
  admin.auth().createUser({
    uid: user.uid,
    email: user.email,
    emailVerified: true,
    password: user.password,
    displayName: user.displayName,
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
  }).then(function(userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
      users.push(userRecord);

    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });


});

lri.input.on('end', function(){
  console.log(users);
  var usersJSON = JSON.stringify(users);
  fs.writeFile("./data_created_users.json", usersJSON, function(err) {
    if(err) {
        return console.log(err);
    }
    console.log("Users wriiten to data_created_users.json");
});
});
