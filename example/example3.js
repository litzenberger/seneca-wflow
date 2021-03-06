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
var sequence=["hello"];
var options={

	filename:"example3_module", // module 
	sequence:["hello"] // flow
}
_seneca.use('../wflow-plugin',options);
_seneca.use('helloworld_plugin',options);



// start
_seneca.ready( function(err){
	if (err) { return; }
	console.log("Inital flow : "+options.sequence)
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
		console.log("append to  workflow");
		var cmd = {role : 'flowEngine', cmd : 'append'};
		// here were are going to change the flow then run it again.
		var sequence=["world","world"];
		var loop =1;
		_seneca.act(cmd,{loop:loop,sequence:sequence},function(){
			start(function(err,r){
				_seneca.log.debug("done --"+r);
				process.exit();

			})
		});
	});



});