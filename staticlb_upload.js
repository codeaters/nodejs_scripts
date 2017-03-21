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

var ref = admin.database().ref('leaderboard/'+lbid);
var setCount = 1;
lri.on('line', function (line) {
  words = line.split(',');
  
  ref.child(words[0]).set({totalScore: Number(words[3]), totalTime: Number(words[4])*1000}, function(error){
	 if(!error){
		 console.log(setCount++);
	 } else{
		 console.log('error');
	 }
  });
});

var promises = [];

lri.input.on('end', function(){
	console.log('end');
  });
