var generator = require('generate-password');
var fs = require('fs');

var passwords = generator.generateMultiple(351, {
    length: 6,
    uppercase: true
});

passwords.forEach(function(val,idx){
    fs.appendFile("passwords.txt",val+"\r\n",function(){});
});