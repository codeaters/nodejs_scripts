var generator = require('generate-password');
var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');
var HashMap = require('hashmap');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

lri=lineReader.createInterface({
  input: fs.createReadStream('./user_upload.csv')
});

//var userRef = admin.database().ref('users');
var map = new HashMap();

lri.on('line', function (line) {
  words = line.split(',');
  user = {};
  user.uid = words[0];
  user.email = words[2]+"@iw.com";  //This is actually email
  user.displayName = words[3];
  user.password = generator.generate({
      length: 6,
      numbers: true
  });

  map.set(user.uid, user);
  //user.team = words[1];
  //user.location = words[4];

//write password to file
//push userRecord to file
fs.appendFile('userdetails_uploaded.txt', user.uid+','+user.email+','+user.displayName+','+user.password+'\r\n', function (status) {
  console.log('Record Written: '+ status);
});
});

var promises = [];

lri.input.on('end', function(){
  //start writing all users in firebase auth
    map.forEach(function(user, key){
              admin.auth().createUser({
          uid: user.uid,
        email: user.email,
        emailVerified: true,
        password: user.password,
        displayName: user.displayName,
        disabled: false
      }).then(function(userRecord) {
      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user in auth:", userRecord.uid);
      map.remove(userRecord.uid);

  })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      fs.appendFile("Users_remaining.txt","******************Users********************\r\n",function(){});
      map.forEach(function(user, uid){
            fs.appendFile("Users_remaining.txt",user.uid+','+user.email+','+user.displayName+','+user.password+'\r\n', function(status){

            });
      });

    });
  });

});
