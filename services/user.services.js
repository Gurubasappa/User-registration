var user = {};
var Q = require('q');
const fs = require('fs');
var mongojs = require('mongojs');
var database = require('../db.js');


user.createUser = createUser;
user.updateUserDetails = updateUserDetails;
user.getAllUsers = getAllUsers;
user.getindividualUser = getindividualUser;
user.deleteindividualUser = deleteindividualUser;

module.exports = user;

function createUser(params){
    console.log("========",params)
    var deferred = Q.defer();
    var userParams = {
        first_name:params.firstName,
        last_name:params.lastName,
        email_id:params.email,
        phone_number:params.phoneNumber,
        profile_file:params.profile
    }
    database.test_user.insert(userParams, function (err, userData) {
        if(err){
            deferred.resolve({ status: "failed", message: 'error while insert user data' ,result:[]});
        }else{
            deferred.resolve({ status: "success", message: 'data inserted successfully' });
        }

    })
    return deferred.promise;
}

function updateUserDetails(params){
    var deferred = Q.defer();
    database.test_user.findAndModify({
        query: { _id:mongojs.ObjectID(params.user_id)},
        update:  {first_name:params.first_name,last_name:params.last_name,phone_number:params.phone_number,profile_file:params.profile_file} ,
        new: true},function(err,result){
            if(err){
                deferred.resolve({ status: "failed", message: 'error while update user data' ,result:[]});
            }else{
                deferred.resolve({ status: "success", message: 'data updated successfully' });
            }

    })
    return deferred.promise;
}

function getAllUsers(params){
    var deferred = Q.defer();
    database.test_user.find({},function(err,result){
        if(err){
            deferred.resolve({ status: "failed", message: 'error while update user data' ,result:[]});
        }else{
            deferred.resolve({ status: "success", message: 'data updated successfully',result:result});
        }
    })
    return deferred.promise;
}

function getindividualUser(user_id){
    var deferred = Q.defer();
    database.test_user.findOne({_id:mongojs.ObjectID(user_id)},function(err,result){
        if(err){
            deferred.resolve({ status: "failed", message: 'error while update user data' ,result:[]});
        }else{
            deferred.resolve({ status: "success", message: 'data updated successfully',result:result});
        }
    })
    return deferred.promise;
}

function deleteindividualUser(params){
    var deferred = Q.defer();
    console.log("=========",params.id)
    database.test_user.remove({_id:mongojs.ObjectID(params.id)},function(err,result){
        if(err){
            deferred.resolve({ status: "failed", message: 'error while update user data' ,result:[]});
        }else{
            database.test_user.find({},function(err,result){
                if(err){
                    deferred.resolve({ status: "failed", message: 'error while update user data' ,result:[]});
                }else{
                    deferred.resolve({ status: "success", message: 'data updated successfully',result:result});
                }
            })
        }
    })
    return deferred.promise;
}