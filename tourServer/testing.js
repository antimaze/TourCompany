const fs = require('fs');
const bcrypt = require('bcryptjs');
let nRounds = 10;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);


var salt = bcrypt.genSaltSync(nRounds);
var hash;
for(let i=0; i<1; i++){


  hash = bcrypt.hashSync("C}m8L\",F", salt);
  console.log("C}m8L\",F" + " " + hash);

  console.log(bcrypt.compareSync("C}m8L\",F", hash));
}
