
var express = require('express');
var router = express.Router();
var schedule = require('node-schedule');
var readcsv = require('../services/readcsv.js');


// schedule.scheduleJob('*/1 * * * * *', () => {
//     readcsv.processCron()
// });
