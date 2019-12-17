const rp = require('request-promise-native');

let cookieJar = rp.jar();

let site1 = {
    uri: 'http://localhost:3000/tours',
    method: 'POST', // What does this do?
    body: {
            	"name" : "Latest Wonders Tour",
            	"date" : "6 April, 2020",
              "tourType" : "physical"
            },
    json: true,
    resolveWithFullResponse: true,
    jar: cookieJar
};

let adminLogin = {
  uri: 'http://localhost:3000/login',
  method: 'POST', // What does this do?
  body: {
            "email" : "sided1830@outlook.com",
            "password" : "C}m8\"L,F"
          },
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
}

let customerLogin = {
  uri: 'http://localhost:3000/login',
  method: 'POST', // What does this do?
  body: {
            "email" : "prolongating1890@yandex.com",
            "password" : "o)62USr5"
          },
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
}

let getToursCount = {
  uri: 'http://localhost:3000/toursCount',
  method: 'GET',
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

let getTours = {
  uri: 'http://localhost:3000/tours',
  method: 'GET',
  json: true,
  resolveWithFullResponse: true,
  jar: cookieJar
};

let logout = {
  uri: 'http://localhost:3000/logout',
  method: 'GET',
  jar: cookieJar
};

async function test(){

  var addTour;
  try{
    console.log("Test 1: Admin Login, add tour");
    var admin = await rp(adminLogin);
    console.log("Admin login test result: ", admin.body);
    console.log("After admin login, Cookies: ", cookieJar.getCookieString(site1.uri));
    var toursCount = await rp(getToursCount);
    console.log("Admin visit, number of tours : ", toursCount.body);
    addTour = await rp(site1);
  }
  catch(err){
    console.log("Admin addtour error : ", err.error);
  }
  toursCount = await rp(getToursCount);
  console.log("Admin add tour test, number of tours: ", toursCount.body);

  rp(logout);
  var tourData = await rp(getTours);
  console.log("After logout, Cookies : ", cookieJar.getCookieString(logout.uri));


  try{
    console.log("\n\nTest 2 : Customer add tour");
    var customer = await rp(customerLogin);
    console.log("Customer login test result : ", customer.body);
    console.log("After customer login, Cookies : ", cookieJar.getCookieString(customerLogin.uri));
    toursCount = await rp(getToursCount);
    console.log("Customer visit, number of tours : ", toursCount.body);
    addTour = await rp(site1);
  }
  catch(err){
    console.log("Customer add tour error : ", err.error);
  }
  rp(logout);

  try{
    console.log("\n\nTest 3 : Guest add tour");
    toursCount = await rp(getToursCount);
    console.log("Guest visit, number of tours: ", toursCount.body);

    tours = await rp(getTours);
    console.log("After guest visit, Cookies: ", cookieJar.getCookieString(getTours.uri));
    addTour = await rp(site1);
  }
  catch(err){
    console.log("Guest add tour error: ", err.error);
  }
}

test().catch(function(err){
  console.log(err);
});

// rp(site1).then(res =>{
//   console.log("After adding physical tour...");
//   console.log(res.body);
// }).catch(rej => {
//   console.log(rej);
// });
