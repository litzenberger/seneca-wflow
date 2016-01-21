'use strict';

/*
/ Example 2: same as example 1 except using seneca 
/
/
*/
var _seneca = require('seneca')().error(
	function(err){
		console.log("error has happened -->"+err.message); 
		process.exit(1);
	});

// load flow plugin with options.
var sequence=["hello","world"];
var options={

	filename:"example2_seneca", // module 
	sequence:["hello","world"] // flow
}
_seneca.use('../wflow-plugin',options);
_seneca.use('example2_plugin',options);



// start
_seneca.ready( function(err){
	if (err) { return; }

	// starts the workflow
	function start(cb) {
		var cmd = {role : 'flowEngine', cmd : 'start'};

		_seneca.act(cmd,function(err,r){
			if (err) { return cb(err); }
				return cb(null,r);

			}
		);
	};

	// start with initial workflow.
	start(function(err,r){
		_seneca.log.debug("change workflow");
		var cmd = {role : 'flowEngine', cmd : 'create'};
		// here were are going to change the flow then run it again.
		var sequence=["hello","world","world"];

		_seneca.act(cmd,{sequence:sequence},function(){
			start(function(err,r){
				_seneca.log.debug("done --"+r);
				process.exit();

			})
		});
	});



});