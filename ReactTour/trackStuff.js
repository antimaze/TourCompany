const rp = require('request-promise-native');

let site1 = {
    uri: 'https://windsurf.grotto-networking.com/data/tracks/track_2016_10_11.json',
    method: 'GET', // What does this do?
    json: true,
    resolveWithFullResponse: true
};

rp(site1).then(res =>{

  var startTime = 0;
  var data = res.body;

  if("start_time" in data){
    startTime = data["start_time"];
  }

  var points = data["points"];
  var pointsLength = points.length;

  console.log("Start time of track_2016_10_11 was : " + startTime);
  console.log("The session lasted " + (pointsLength / 60));
  console.log(new Date(Date.UTC(2016, 10, 11, 0, 0, 0, startTime)).toString());
});
