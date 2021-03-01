


var test = {};
var Q = require('q');
const csv = require('csv-parser');
const fs = require('fs');
var moment = require('moment');

var database = require('../db.js');


test.proceedToRead = proceedToRead;
test.searchAgentData = searchAgentData;
test.getAgreegate = getAgreegate;
test.saveMessage = saveMessage;
test.processCron = processCron;


module.exports = test;

function proceedToRead(req) {
    var deferred = Q.defer();

    fs.createReadStream('./uploads/data_sheet.csv')
        .pipe(csv())
        .on('data', (row) => {
            database.test_agents.insert(row, function (err, batchcreated) {
                if(err){
                    deferred.resolve({ status: "failed", message: 'failed to insert agent data' })
                }else{
                    deferred.resolve({ status: "success", message: 'Agent data inserted successfully' });
                }
            })
        })
        .on('end', () => {
            
        });
    return deferred.promise;

}

function searchAgentData(params){
    var deferred = Q.defer();
    console.log("======",params.policy_number)
    var username = params.policy_number;
    var query = {"policy_number":username}
    database.test_agents.find(query, function (err, agentData) {
        if(err){
            deferred.resolve({ status: "failed", message: 'error while find agent data' ,result:[]});
        }else if(agentData){
            deferred.resolve({ status: "success", message: 'data fetched successfully', result:agentData });
        }else{
            deferred.resolve({ status: "success", message: 'no data found',result:[] });
        }

    })
    return deferred.promise;
   
}

function getAgreegate(params){
    var deferred = Q.defer();
    
    database.test_agents.aggregate([
           {
               "$match": {}
           },
           { "$group": { "_id": {"agent":"$agent","premium_amount":"$premium_amount","category_name":"$category_name"}, count: { $sum: 1 } } }], async function (err, requests) {

            if(err){
                deferred.resolve({ status: "failed", message: 'error while find agent data' ,result:[]});
            }else if(requests){
                deferred.resolve({ status: "success", message: 'data fetched successfully', result:requests });
            }else{
                deferred.resolve({ status: "success", message: 'no data found',result:[] });
            }
            
        })

    return deferred.promise;
   
}

function saveMessage(params){
    var deferred = Q.defer();
    var messageParams = {
        message : params.message,
        job_at : params.job_at
    }
    database.test_collection1.insert(messageParams, function (err, datcreated) {
            if(err){
                deferred.resolve({ status: "failed", message: 'error while insert data'});
            }else{
                deferred.resolve({ status: "success", message: 'data inserted successfully'});
            }
    })
    return deferred.promise;
}


function processCron(params){
    var deferred = Q.defer();
    var current_time = moment().format();
    console.log("===========",current_time)
    database.test_collection1.find({job_at:current_time}, function (err, requestData) {
        if(err){
            deferred.resolve({ status: "failed", message: 'error while find data'});
        }else if(requestData && requestData.length>0){
            database.test_collection2.insert(requestData, function (err, datcreated) {
                if(err){
                    deferred.resolve({ status: "failed", message: 'error while find data'});
                }else{
                    deferred.resolve({ status: "success", message: 'job done'});
                }
            })
        }else{
            deferred.resolve({ status: "failed", message: 'no data found'});
        }
    })
    return deferred.promise;
}
