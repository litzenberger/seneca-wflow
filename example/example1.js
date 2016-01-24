'use strict';
/**
 * @fileoverview defines the worklfow 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 * Example 1: example to show how to set inital flow and then modify flow. 
 */

var _seneca = require('seneca')().error(
	function(err){
		console.log("error has happened -->"+err.message); 
		process.exit(1);
	});

// load flow plugin with options.
var sequence=["hello","world"];
var options={
	filename:"example1_module", // module 
	sequence:["hello","world"] // flow

}
_seneca.use('../wflow-plugin',options);

// start
_seneca.ready( function(err){
	if (err) { return; }

	function start(cb) {
		var cmd = {role : 'flowEngine', cmd : 'start'};

		_seneca.act(cmd,function(err,r){
			if (err) { return cb(err); }
				return cb(null,r);

			}
		);
	};

	// start with initial flow.
	start(function(err,r){
		_seneca.log.debug("change workflow");
		var cmd = {role : 'flowEngine', cmd : 'create'};
		var sequence=["hello","world","world"];
		// here were are going to change the flow then run it again. 
		_seneca.act(cmd,{sequence:sequence},function(){
			start(function(err,r){
				_seneca.log.debug("done --"+r);
				process.exit();

			})
		});

		});



});