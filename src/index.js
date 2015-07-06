var express = require('express'),
	bodyParser = require('body-parser'),
	apiErrorHandler = require('api-error-handler'),
	expressDomainMiddleware = require('express-domain-middleware'),
	_ = require('lodash'),
	heroku2BeRouter = require('./heroku2BeRouter');

var app = express()
app.use(bodyParser.json())
app.use(expressDomainMiddleware)

app.use(function(req, res, next){
	res.setHeader("Access-Control-Allow-Origin", "*");
	res.header('Access-Control-Allow-Methods', 'GET,PUT,PATCH,POST,DELETE');
	if(req.headers['access-control-request-headers'])
		res.setHeader("Access-Control-Allow-Headers", req.headers['access-control-request-headers']);
	if ('OPTIONS' == req.method)
		res.send(200);
	else
		next();
})

app.use('/heroku2-be', heroku2BeRouter);

app.use(function (req, res) {
	res.status(404).send('Oops, file not found')
})
app.use(apiErrorHandler())
app.listen(3002, function(){console.log('listening on 3002')});
