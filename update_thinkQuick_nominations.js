var admin = require("firebase-admin");
var lineReader = require('readline');
var fs = require('fs');
var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

var users = [];

lri=lineReader.createInterface({
  input: fs.createReadStream('./nominations.txt')
});

var dbRef =admin.database().ref("users");
var count =1;
lri.on('line', function(empid){
  users.push(empid);
  dbRef.child(empid).child("canThinkQuick").set(true, function(error){
	  if(error){
		  console.log(error);
	  }
	  else console.log("Success" + (count++));
  });
  //admin.auth().getUser(empid)
  //.then(function(userRecord) {console.log(userRecord)}).catch(function(error){});
  //console.log(empid);
});

lri.input.on('end', function(){
	//console.log(users);
});
//
// var ref = admin.database().ref('users');
//
// ref.on('value', function(snapshot){
//   snapshot.forEach(function(child){console.log(child.key);});
// },function(error){console.log(error)});
