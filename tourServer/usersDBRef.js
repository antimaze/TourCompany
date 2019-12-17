const DataStore = require('nedb-promises');
const userDB = DataStore.create(__dirname + '/usersDB');

module.exports = userDB;
