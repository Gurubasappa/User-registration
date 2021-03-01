var http                    = require('http');
var express                 = require('express');
var bodyParser              = require('body-parser');

var port                    = 8088;
var app                     = express();
var database = require('./db.js');
var osu = require('node-os-utils')

var jsonParser = bodyParser.json()
 
app.use(bodyParser.json())

// create application/x-www-form-urlencoded parser
var urlencodedParser = bodyParser.urlencoded({ extended: false })

var cpu = osu.cpu

cpu.usage() //cpu utilization
  .then(info => {
    console.log(info)
  })

app.use(function (req, res, next) { //allow cross origin requests
  res.setHeader("Access-Control-Allow-Methods", "POST, PUT, OPTIONS, DELETE, GET");
  res.header("Access-Control-Allow-Origin", 'http://localhost:8088');
  var allowedOrigins = ['http://localhost:8088','http://localhost:4200'];
  var origin         = req.headers.origin;
  if(allowedOrigins.indexOf(origin) > -1){
      res.setHeader('Access-Control-Allow-Origin', origin);
  }
  res.header("Access-Control-Allow-Headers", "Origin, x-parse-application-id,x-parse-rest-api-id,x-parse-rest-api-key, X-Requested-With,Authorization, Content-Type, Accept");
  res.header("Access-Control-Allow-Credentials", true);
 
  next(); 

});

const  multipart  =  require('connect-multiparty');
const  multipartMiddleware  =  multipart({ uploadDir:  './uploads' });

app.post('/api/upload', multipartMiddleware, (req, res) => {
  res.json({
      'message': 'File uploaded successfully'
  });
});

app.use((req, res, next)=>{
    if (req.headers['content-type'] && req.headers['content-type'].includes("application/json")&& req.originalUrl.toLowerCase().includes('/api/readcsv/searchAgentData'))
    req.headers['content-type'] = "application/json";    
            next();  
  });
  app.use(bodyParser.text({ type: 'application/json'}))

var readcsv            = require('./controllers/readcsv.controller');
var cron                    = require('./controllers/cron.controller');
var userController        = require('./controllers/user.controller');



app.use('/api/readcsv', readcsv);
app.use('/api/user', userController);


var httpServer = http.createServer( app);
httpServer.setTimeout(300000);
httpServer.listen(port,function(){
    console.log('Server started on port',port);
});

// console.log(1 < 2 < 3);
// console.log(3 > 2 > 1);

// a = [1,2,3,4]

// 1. console
// 2. break and continue
// 3. removing and insert of perticular index value from the array
// 4. 



// csv 1 row

// agent:=>
// {
//     _id:"",
//      agent_name: "ABC"
// }

//  users:=>
//  {
//      first_name:"xyz",
//      dob:"",
//      address:"",
//      phone_number:"",
//      state:"",
//      zip_code:"",
//      email:"",
//      gender:"",
//      user_type:""
//  }

//  user_account:=>
//  {
//      account_name:""
//  }

//  policy_category:=>
//  {
//      category_name:""
//  }

//  policy_career:=>
//  {
//      company_name:""
//  }

//  policy_info:=>
//  {
//      policy_number:"",
//      policy_start_date:"",
//      policy_end_date:"",
//      policy_category:"",
//      policy_collection_id:"",
//      company_collection_id:"",
//      user_id:"",
//      premium_amount:""
//  }

// user_collection

// db.articles.aggregate([
//   { $match: { },
//   { $lookup: {
//          from: "policy_info",
//          localField: "_id",
//          foreignField: "user_id",
//          as: "policy_details"
//        } }
// ]);

//  {
//      first_name:"xyz",
//      dob:"",
//      address:"",
//      phone_number:"",
//      state:"",
//      zip_code:"",
//      email:"",
//      gender:"",
//      user_type:"",
//      policy_details:[{
//         policy_number:"",
//         policy_start_date:"",
//         policy_end_date:"",
//         policy_category:"",
//         policy_collection_id:"",
//         company_collection_id:"",
//         user_id:"",
//         premium_amount:""
//  }]
//  }



// state:"",
// total_accounts:"",
// total_policies:"",
// total_premium:""


// 1 fetch the users
// 2. get unique states
// 3. fetch 

// [{

// },
// {

// }]


// console.log(1 < 2 < 3);
// console.log(3 > 2 > 1);
