const db = require('./tourDBRef');
const tours = require('../ReactTour/tours.json');

async function initializeTours(){
  try{
    let numberRemoved = await db.remove({}, {multi: true});
    console.log("Removed tours : " + numberRemoved);

    var physicalTours = tours.physicalTours;
    var virtualTours = tours.virtualTours;

    let allTours = [];
    physicalTours.forEach(async function(tour){
      tour.tourType = "physical";
      allTours.push(tour);
    });

    virtualTours.forEach(async function(tour){
      tour.tourType = "virtual";
      allTours.push(tour);
    });

    addedTour = await db.insert(allTours);
  }
  catch(err){
    console.log(err);
  }
}

initializeTours();
