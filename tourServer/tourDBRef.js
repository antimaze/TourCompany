const DataStore = require('nedb-promises');
const tourDB = DataStore.create(__dirname + '/tourDB');

module.exports = tourDB;
