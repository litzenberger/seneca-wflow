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

	filename:"example4_module", // module 
	sequence:["hello","preWF:generateLoop"] // flow
}
_seneca.use('../wflow-plugin',options);
_seneca.use('helloworld_plugin',options);



// start
_seneca.ready( function(err){
	if (err) { return; }
	console.log("Inital flow : "+options.sequence)
	
		// starts the workflow
		var flow=_seneca.pin({role:"flowEngine","cmd":"*"})
			flow.start(function(err,r){
			if (err) { return cb(err); }
				_seneca.log.debug("done --"+r);
				process.exit();

			}
		);

});