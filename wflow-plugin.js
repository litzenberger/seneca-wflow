"use strict"
/**
 * @fileoverview defines the worklfow 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 *
 */


var _ = require('underscore');
var async = require('async');
var flowEngine = require('./lib/flowEngine');

var exports = module.exports = function(options) {

	var seneca = this;
	var options = options;

	var noop = function () {};
	var plugin = "flowEngine";
	var workflow = {};
	// init seneca plugins
	seneca.add({init : plugin},init);
	seneca.add({role : plugin,cmd : 'add'}, add);
	seneca.add({role : plugin,cmd : 'create'}, create_sequence);
	seneca.add({role : plugin,cmd : 'start'}, start_sequence);
	seneca.add({role : plugin,cmd : 'append'}, push_sequence);

	// initialize
	function init (args,cb) {

		workflow= new flowEngine(seneca);
		seneca.log.debug("init called");
		if(options.filename!== undefined){
		workflow.register(options.filename,function(err){
			if(options.sequence!== undefined)
			{
				workflow.create_sequence(options.sequence,function(err){
				seneca.log.debug("create sequence called")
				return cb();

			});
			}
			else{
				return cb();
			}

		})
	}else{
		return cb();

	}

	
	}

	// load the module
	function add (args,cb) {

		// task is a list of activities that will run in order
		workflow.use(args.filename);
		return cb();
				


	}
	// defines sequence
	function create_sequence (args,cb) {

		// task is a list of activities that will run in order
		workflow.create_sequence(args.sequence,cb);
				


	}
	// starts sequence
	function start_sequence (args,cb) {
		// run activity list
		workflow.start_sequence(args,cb);

	}

		// appends a new sequence to current sequence. 
	function push_sequence (args,cb) {
		// run activity list
		workflow.push_sequence(args.loop,args.sequence,cb);

	}


	return {
		name:plugin
	}

}