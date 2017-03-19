var admin = require("firebase-admin");
var lineReader = require('readline');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

var users = [];

lri=lineReader.createInterface({
  input: fs.createReadStream('./thinkQuick_nominations.txt')
});

lri.on('line', function(empid){
  users.push(empid);
  console.log(empid);
});
//
// var ref = admin.database().ref('users');
//
// ref.on('value', function(snapshot){
//   snapshot.forEach(function(child){console.log(child.key);});
// },function(error){console.log(error)});
