const rp = require('request-promise-native');

let cookieJar = rp.jar();

let visitTour = {
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

let site1 = {
    uri: 'http://localhost:3000/login',
    method: 'POST', // What does this do?
    body: {
            	"email" : "prolongating1890@yandex.com",
            	"password" : "o)62USr5"
            },
    json: true,
    resolveWithFullResponse: true,
    jar: cookieJar
};

let site2 = {
    uri: 'http://localhost:3000/login',
    method: 'POST', // What does this do?
    body: {
            	"email" : "prolongating1890@yandex.co",
            	"password" : "o)62USr5"
            },
    json: true,
    resolveWithFullResponse: true,
    jar: cookieJar
};

let site3 = {
    uri: 'http://localhost:3000/login',
    method: 'POST', // What does this do?
    body: {
            	"email" : "prolongating1890@yandex.com",
            	"password" : "o)62USr"
            },
    json: true,
    resolveWithFullResponse: true,
    jar: cookieJar
};

// async function tryLogin(site){
//   var loginData = await rp(site);
//   return loginData;
// }
//
// async function doLogin(){
//   var loginTry1 = tryLogin(site1);
//   var loginTry2 = tryLogin(site2);
//   var loginTry3 = tryLogin(site3);
//
//   let loginDatas = await Promise.all([loginTry1, loginTry2, loginTry3]);
//
//   for(var i=0; i<loginDatas.length; i++){
//     console.log(loginDatas[i]);
//   }
// }
//
// doLogin().catch(function(error){
//   console.log(error);
// });

async function doLogin(){
  console.log("Login test 1 : Good login");
  var tourData = await rp(visitTour);
  console.log("called tour, Cookies : " + cookieJar.getCookieString(visitTour.uri));
  var goodLogin;
  try{
    goodLogin = await rp(site1);
    console.log("Good login test result : ", goodLogin.body);
    console.log("\nAfter good login, Cookies : ", cookieJar.getCookieString(visitTour.uri));
  }
  catch(err){
    console.log("Good login err result : ", err.error);
    console.log("\nAfter good login error, Cookies : ", cookieJar.getCookieString(visitTour.uri));
  }

  console.log("Before Logging out...");
  rp(logout);
  var tourData = await rp(visitTour);
  console.log("\nAfter logout, Cookies : ", cookieJar.getCookieString(logout.uri));

  console.log("\nLogin test 2: Bad Email");
  var tourData = await rp(visitTour);
  console.log("called tour, Cookies : " + cookieJar.getCookieString(visitTour.uri));

  var emailProblem;
  try{
    emailProblem = await rp(site2);
  }
  catch(err){
    console.log("Bad email login error : ", err.error);
    console.log("After login test 2, Cookies : ", cookieJar.getCookieString(visitTour.uri));
  }

  console.log("\nLogin test 3: Bad password");
  var passwordProblem;
  try{
    passwordProblem = await rp(site3)
  }
  catch(err){
    console.log("Bad password login error : ", err.error);
    console.log("\nAfter login test 3, Cookies : ", cookieJar.getCookieString(visitTour.uri));
  }
}

doLogin().catch(function(error){
  console.log(error);
});
