var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

lri=lineReader.createInterface({
  input: fs.createReadStream('./lbt1p1.csv')
});

var lbid = 'thinkQuickPhase1';

var ref = admin.database().ref('users');
var setCount = 1;
lri.on('line', function (line) {
  words = line.split(',');
  
  ref.child(words[0]).set({team: words[2], username: words[2], name: words[1]}, function(error){
	 if(!error){
		 console.log(setCount++);
	 } else{
		 console.log('error');
	 }
  });
});
