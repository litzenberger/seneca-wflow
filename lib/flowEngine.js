'use strict';

/*global require, module, console, __dirname */
/*jslint node:true */
/**
 * @fileoverview flowEngine lib
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 *
 */
var _ = require('underscore');
var async = require('async');
var path = require('path');
var util = require('util');

module.exports = FlowEngine;

/**
 * FlowEngine constructor
 *
 * @param seneca 
 */
function FlowEngine(seneca) {
	if (!(this instanceof FlowEngine))
		return new FlowEngine(seneca);

	this.seneca	=	seneca;
	this.log=	seneca.log;
		// use var makeuse      = require('use-plugin')
	this.activities = {};
	this.flow=[];

}

FlowEngine.prototype = {
    constructor: FlowEngine,
    code: function (f, callback) {
    	var code=this.flow[f].toString();
    	return callback(code);
    }
};


// load the functions available for this workflow
FlowEngine.prototype.register = function(filename,cb) {
	var self=this;
	self.activities=require(path.join(path.dirname(require.main.filename),filename));
	self.seneca.log.debug(" registered file "+filename);
	return cb();
};

// creates business process
FlowEngine.prototype.create_sequence = function(list,cb) {
	var self=this;
	self.flow.length=0;
	self.seneca.log.debug("create_sequence  "+JSON.stringify(list));
		for(var i = 0; i < list.length;i++){
        	self.flow.push(async.apply(self.activities[list[i]],self.seneca));
        	this.log.debug("loaded --> "+list[i]);
        	if(i===list.length-1){
        		return cb();}
        }
       
};

// execute busines process
FlowEngine.prototype.start_sequence = function(args,cb) {
	var self=this;
	var flow=self.flow;
	if(self.flow.length===0){return cb(new Error("flowEngine Error: must register and create sequence before start sequence"));}
	try{
		var taskList= self.flow.splice(0,self.flow.length);
		async.waterfall(taskList, function(err,r) {
			if (err) {return cb(err); }
			// done 
			var rArray=[];
			rArray.push(r)
			return cb(null,null);
		});
	}
	catch(e){
		return cb(new Error("flowEngine Processing Error:  " +e.message +" stack trace"+e.stack));
	}
};

// exexute a process by name
FlowEngine.prototype.execute = function(f,cb) {
	var self=this;
	async.composission([f], function(err) {
			if (err) {return cb(err); }
			// done 
			return cb(null,results);
		});
};






