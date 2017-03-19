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
  input: fs.createReadStream('./users_db.csv')
});

//var userRef = admin.database().ref('users');
var map = new HashMap();

var ref = admin.database().ref('users');

lri.on('line', function (line) {
  words = line.split(',');
  user = {};
  user.uid = words[0];
  user.name = words[1];
  user.username = words[2];  //This is actually email
  user.team = words[3];
  map.set(user.uid, user);
});

var promises = [];

lri.input.on('end', function(){
  //start writing all users in firebase auth
    map.forEach(function(user, key){
              ref.child(key).set({
                  username: user.username,
                  name: user.name,
                  team: user.team
              }, function(error){
                  if(!error){
                      // See the UserRecord reference doc for the contents of userRecord.
      console.log("Successfully created new user in DB");
                  }
                  else{
                      console.log("Error creating new user:", error);
      fs.appendFile("Users_remaining.txt","******************Users********************\r\n",function(){});
      map.forEach(function(user, uid){
            fs.appendFile("Users_remaining.txt",user.uid+','+user.displayName+','+user.email.split('@')[0]+','+user.password+'\r\n', function(status){

            });
      });
                  }
                  
              });
   
  });

});
