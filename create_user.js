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
  user.firstname = words[1];
  user.lastname = words[2];
  user.email = words[1]+'.'+words[2]+'@iw.com';
  user.displayName =  words[1]+' '+words[2];
  user.password = crypto.createHash('md5').update( words[1]+words[2]+String(Date.now())).digest('hex');
  users.push(user);

  /*push users to firebase auth*/
  admin.auth().createUser({
    email: user.email,
    emailVerified: true,
    password: user.password,
    displayName: user.displayName,
    photoURL: "http://www.example.com/12345678/photo.png",
    disabled: false
  })
    .then(function(userRecord) {
      console.log("Successfully created new user:", userRecord.uid);
    })
    .catch(function(error) {
      console.log("Error creating new user:", error);
    });

});
/*
lri.input.on('end', function(){
  console.log(users);
});
*/
