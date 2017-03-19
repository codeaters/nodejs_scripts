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
  input: fs.createReadStream('./users.csv')
});

//var userRef = admin.database().ref('users');
var map = new HashMap();

lri.on('line', function (line) {
  words = line.split(',');
  user = {};
  user.uid = words[0];
  user.email = words[2]+'@iw.com';  //This is actually email
  user.displayName = words[1];
  user.password = words[3];

  map.set(user.uid, user);
});

var ids = ["126643",
"205006",
"352689",
"759843",
"1004431",
];

lri.input.on('end', function(){
  //start writing all users in firebase auth
    ids.forEach(function(id,idx){
      
      var user = map.get(id);
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
      ids.pop(userRecord.uid);

  })
    .catch(function(error) {
      console.log("Error creating new user:", error);
      fs.appendFile("Users_remaining.txt","******************Users********************\r\n",function(){});
      ids.forEach(function(user, uid){
            fs.appendFile("Users_remaining.txt",user+'\r\n', function(status){

            });
      });

    });
  });

});
