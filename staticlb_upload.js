var admin = require("firebase-admin");
var fs = require('fs');
var lineReader = require('readline');

var serviceAccount = require("./serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://technoweekapp.firebaseio.com"
});

lri=lineReader.createInterface({
  input: fs.createReadStream('./lbt2p1.csv')
});

var lbid = 'thinkQuick';
var lines = {};
var ref = admin.database().ref('leaderboard/'+lbid);
var updateRef = admin.database().ref('leaderboard/'+lbid);
var setCount = 1;
lri.on('line', function (line) {
  words = line.split(',');
  lines[words[0]] = {totalScore: Number(words[1]), totalTime: Number(words[2])*1000};
});


var count = 1;


lri.input.on('end', function(){
	console.log('end');
  for(key in lines){
    ref.child(key).once('value', function(snap){
      if(snap.val()==null){
        lines[snap.key].correct=0;
        lines[snap.key].incorrect=0;
        lines[snap.key].rank=0;
      }
      else{
        lines[snap.key].totalScore+=snap.val().totalScore;
        lines[snap.key].totalTime+=snap.val().totalTime;
        lines[snap.key].correct=snap.val().correct;
        lines[snap.key].incorrect=snap.val().incorrect;
        lines[snap.key].rank=snap.val().rank;

      }
      updateRef.child(snap.key).set(lines[snap.key], function(error){if(error){console.log(error);}});
      console.log(lines[snap.key]);

    }, function(error){console.log('Error Retrieving Child: '+ error);});
  }

  });
