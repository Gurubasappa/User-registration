var mongojs = require('mongojs');


module.exports = mongojs('mongodb://localhost:27017/data_checker',
['inclusify_jobs'
]
);