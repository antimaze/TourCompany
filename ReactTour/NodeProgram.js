const rp = require('request-promise-native');

// rp({
//   "method": "GET",
//   "uri": "https://windsurf.grotto-networking.com/data/logs/windEvents2017.json",
//   "json": true,
// }).then(console.log, console.log);

let site1 = {
    uri: 'https://windsurf.grotto-networking.com/data/logs/windEvents2016.json',
    method: 'GET', // What does this do?
    json: true,
    resolveWithFullResponse: true
};

rp(site1).then(res =>{

  var sailingSessions = 0;
  var average = 0;
  var longest = -1.0;

  var data = res.body;

  data.map((eventData, i) => {
    if("sail" in eventData){
      sailingSessions += 1;
    }

    if("max10sec" in eventData){
      average += parseFloat(eventData["max10sec"].toString());
    }

    if("distance" in eventData){
      if(parseFloat(eventData["distance"].toString()) > longest){
        longest = parseFloat(eventData["distance"].toString());
      }
    }

  });

  console.log("The number of sailing session in 2016 was : " + sailingSessions);
  console.log("The fastest 10 second speed average was : " + (average / sailingSessions));
  console.log("The longest single day distance was : " + longest);
});
