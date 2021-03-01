var express = require('express');
var router = express.Router();
var readcsv = require('../services/readcsv.js');


router.get('/insertAgentData', insertAgentData);
router.post('/searchAgentData', searchAgentData);
router.post('/getAgreegate', getAgreegate);
router.post('/saveMessage', saveMessage);

module.exports = router;

function insertAgentData(req, res){
    readcsv.proceedToRead(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed to process request" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed to process request" });
    })
}

function searchAgentData(req, res){
    readcsv.searchAgentData(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Login Failed" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Login Failed" });
    })
}

function getAgreegate(req, res){
    readcsv.getAgreegate(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed to process request" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed to process request" });
    })
}

function saveMessage(req, res){
    readcsv.saveMessage(req.body).then(function (response) {
        if (response) {
            res.json(response);
        } else {
            res.json({ status: "failed", message: "Failed to process request" });
        }
    }).catch(function (err) {
        res.json({ status: "failed", message: "Failed to process request" });
    })
}