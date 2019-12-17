var tours = require('../ReactTour/tours.json');
var express = require('express');
var bodyParser = require('body-parser');
var bcrypt = require('bcryptjs');
var users = require('./userTourHash.json');
var session = require('express-session');
var cookieParser = require('cookie-parser');

let tourDB = require('./tourDBRef');
let usersDB = require('./usersDBRef');

var app = express();

app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({extended : false}));

const cookieName = "kr6986toursid";
app.use(session({
  secret : 'savan patel',
  resave: false,
  saveUninitialized: false,
  name: cookieName
}));

const setUpSessionMiddleware = function(req, res, next){
  if(!req.session.user){
    req.session.user = {role: 'guest'};
  }
  next();
}

app.use(setUpSessionMiddleware);

var getTours = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var toursData = await tourDB.find({});
  res.json(toursData);
}

var getTourByID = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var tourID = req.params.id;
  var tour = await tourDB.find({"_id": tourID});
  if(typeof(tour) != "undefined" && tour.length > 0){
      res.status(200).json(tour);
  }
  else{
    res.status(404).json("Tour not found...");
  }
}

var deleteTourByID = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var tourID = req.params.id;
  var deletedTour = await tourDB.remove({_id: tourID}, {});
  if(deletedTour > 0){
    res.status(200).json("Tour deleted successfully...");
  }
  else{
    res.status(404).json("Tour not deleted...");
  }
}

var getNumberOfTours = async function(req, res){
  res.setHeader('Content-Type', 'application/json');
  var toursData = await tourDB.find({});
  res.json(toursData.length);
}

var addTours = async function(req, res){
  console.log("Tour Data : ", req.body);
  var tour = req.body;
  var tourType = tour.tourType;

  var addedTour;
  if(typeof(tour) != "undefined"){
    if(typeof(tourType) == "undefined"){
      tour.tourType = "physical";
    }

    addedTour = await tourDB.insert(tour);
    res.status(200).json(addedTour);
  }
  else{
    res.status(500).json("Tour data is undefined");
  }
}

var doLogin = async function(req, res){
  var loginData = req.body;
  console.log("LoginData : ", loginData);
  var email = loginData.email;
  var password = loginData.password;
  var errorData = {
                      "error": true,
                      "message": "User/Password error"
                   };

  var resData;
  var tempUser;
  var user;
  if(typeof(email) != "undefined" && typeof(password) != "undefined"){
    user = await usersDB.findOne({email: email});
    if(!user){
      console.log("User not found...");
      res.status(404).json(JSON.stringify(errorData));
    }
    else{
      console.log("password : ", password);
      console.log("user password : ", user.password);
      let verified = bcrypt.compareSync(password, user.password);
      if(verified){
        console.log("Password Verified...");
        var oldUserInfo = req.session.user;
        req.session.regenerate(function(err){
          if(err){
            console.log(err);
          }

          let newUserInfo = Object.assign(oldUserInfo, user);
          delete newUserInfo.password;
          req.session.user = newUserInfo;
          res.status(200).json(newUserInfo);
        });
      }
      else{
        console.log("Password not verified...");
        res.status(404).json(JSON.stringify(errorData));
      }
    }
  }
  else{
    console.log("Email or Password is not given...");
    resData = "Bad login data : StatusCodeError: 404 - " + JSON.stringify(errorData);
    res.status(404).json(resData);
  }
}

var doLogout = function(req, res){
  console.log("logging out from server...");
  let options = req.session.cookie;
  req.session.destroy(function(err){
    if(err){
      console.log(err);
      res.status(404).json(error);
    }
    res.clearCookie(cookieName, options);
    res.status(200).json({message: 'GoodBye'});
  });
}

var checkAdmin = function(req, res, next){
  var err = {"error": "Not Permitted"};
  if(req.session.user.role !== 'admin'){
    var errString = "StatusCodeError: 404 - " + JSON.stringify(err);
    res.status(404).json(errString);
  }
  else{
    next();
  }
}

var checkCustomer = function(req, res, next){
  var err = {"error": "Not Permitted"};
  if(req.session.user.role !== 'customer'){
    var errString = "StatusCodeError: 404 - " + JSON.stringify(err);
    res.status(404).json(errString);
  }
  else{
    next();
  }
}

app.get('/tours', getTours);
app.get('/tours/:id', getTourByID);
app.get('/toursCount', getNumberOfTours);
app.post('/tours', checkAdmin, addTours);
app.delete('/tours/:id', checkAdmin, deleteTourByID);
app.post('/login', express.json(), doLogin);
app.get('/logout', doLogout);

module.exports = app;
