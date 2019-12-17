const db = require('./usersDBRef');
const users = require('./userTourHash.json');
var bcrypt = require('bcryptjs');


async function initializeUsers(){
  try{
    let numberRemoved = await db.remove({}, {multi: true});
    console.log('Removed ' + numberRemoved + ' users...');

    let newUsers = await db.insert(users);
    console.log('Added ' + newUsers + ' users...');
  }
  catch(err){
    console.log(err);
  }
}

async function checkUser(){
  try{
    let user = await db.findOne({email: "sided1830@outlook.com"});
    console.log(user);
    let verified = bcrypt.compareSync("C}m8L,F", user.password);
    console.log(verified);
  }
  catch(err){
    console.log(err);
  }
}

initializeUsers();
// checkUser();
