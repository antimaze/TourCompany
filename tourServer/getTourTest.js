const rp = require('request-promise-native');

let site1 = {
    uri: 'http://localhost:3000/tours',
    method: 'GET', // What does this do?
    json: true,
    resolveWithFullResponse: true
};

rp(site1).then(res =>{
  console.log(res.body);
}).catch(rej => {
  console.log(rej);
});
