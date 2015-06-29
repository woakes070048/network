var Jobs       = require('../models/jobs');
var express = require('express')


var router = module.exports = express.Router();


	//endpoint which retreives all jobs
	router.get('/', function(req, res){
		Jobs.retrieveAll(function(x){res.send({Jobs: x});
    });
  });

//endpoint which adds a job
	router.post('/', function(req, res){
		if (!req.body) return res.sendStatus(400);
			var newValues = Jobs.updateOrCreate(req.body);
		res.send(req.body)
	});

