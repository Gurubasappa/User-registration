var express = require('express');
var router = express.Router();
var userservice = require('../services/user.services.js');
var multer = require('multer');


router.post('/createUser', createUser);
router.post('/updateUserDetails', updateUserDetails);
router.post('/getAllUsers', getAllUsers);
router.get('/getindividualUser/:id', getindividualUser);
router.post('/deleteindividualUser', deleteindividualUser);
router.post('/uploadimage', uploadimage);

module.exports = router;

function createUser(req,res){
    userservice.createUser(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed create user" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed create user" });
    })
}

function updateUserDetails(req,res){
    userservice.updateUserDetails(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed update user" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed update user" });
    })
}

function getAllUsers(req,res){
    userservice.getAllUsers(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed update user" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed update user" });
    })
}

function getindividualUser(req,res){
    console.log("req.query.id",req.params.id)
    userservice.getindividualUser(req.params.id).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed update user" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed update user" });
    })
}

function uploadimage(req,res){
    console.log("=============")
    var storage = multer.diskStorage({
        destination: function (req, file, next) {
            next(null, '../uploads');
            console.log("ccccccccccccccc")
        },
        filename: function (req, file, next) {
          console.log("======",file.originalname);
            var uploadedName = file.originalname;
            next(null, uploadedName);
            //docket_title=basename;
        }
    });
  
    var upload = multer({ storage: storage }).single('file');
    upload(req, res, function (err) {
      res.send({status:"success",result:[]})
    })
}

function deleteindividualUser(req,res){
    userservice.deleteindividualUser(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed update user" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed update user" });
    })
}

