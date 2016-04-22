'use strict';

var platform = require('./platform'),
	isPlainObject = require('lodash.isplainobject'),
    isArray = require('lodash.isarray'),
    async = require('async'),
	splunkClient;

let sendData = (data, callback) => {
    splunkClient.send({message: data}, function(error, response, body){
        if(!error){
            platform.log(JSON.stringify({
                title: 'Data sent to Splunk.',
                data: data
            }));
        }

        callback(error);
    });
};

platform.on('data', function (data) {
    if(isPlainObject(data)){
        sendData(data, (error) => {
            if(error) {
                console.error(error);
                platform.handleException(error);
            }
        });
    }
    else if(isArray(data)){
        async.each(data, (datum, done) => {
            sendData(datum, done);
        }, (error) => {
            if(error) {
                console.error(error);
                platform.handleException(error);
            }
        });
    }
    else
        platform.handleException(new Error(`Invalid data received. Data must be a valid Array/JSON Object or a collection of objects. Data: ${data}`));
});
platform.once('close', function () {
	platform.notifyClose();
});

platform.once('ready', function (options) {
	var Splunk = require('splunk-logging').Logger;
	splunkClient = new Splunk({token: options.token, url: options.url});

	platform.notifyReady();
});