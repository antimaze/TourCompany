const fs = require('fs');
const bcrypt = require('bcryptjs');
const users = require('./userTours.json');
let nRounds = 10;
let hashedUsers = [];
let start = new Date(); // timing code
console.log(`Starting password hashing with nRounds = ${nRounds}, ${start}`);


var salt = bcrypt.genSaltSync(nRounds);
var hash;
for(let i=0; i<users.length; i++){


  hash = bcrypt.hashSync(users[i].password, salt);
  console.log(users[i].password + " " + hash);

  // console.log(bcrypt.compareSync(users[i].password, hash)); 

  users[i].password = hash;
  hashedUsers.push(users[i]);

  //   bcrypt.genSalt(nRounds, function(err, salt) {
  //     bcrypt.hash(users[i].password, salt, function(err, hash) {
  //         // Store hash in your password DB.
  //         console.log(users[i].password + " " + hash);
  //         users[i].password = hash;
  //         hashedUsers.push(users[i]);
  //         if(i == (users.length - 1))
  //         {
  //           let elapsed = new Date() - start; // timing code
  //           console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
  //           fs.writeFileSync("userTourHash.json", JSON.stringify(hashedUsers, null, 2));
  //         }
  //     });
  // });
}

let elapsed = new Date() - start; // timing code
console.log(`Finished password hashing, ${elapsed/1000} seconds.`);
fs.writeFileSync("userTourHash.json", JSON.stringify(hashedUsers, null, 2));
