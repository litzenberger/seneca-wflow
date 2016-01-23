"use strict"

/**
 * @fileoverview defines the worklfow 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 *
 */

module.exports = {

	generateLoop : function(seneca,next){

		
		// here were are using the append process to generate a loop.
		var sequence=["world","world"];
		var loop =1;
		var cmd = {role : 'flowEngine', cmd : 'append',loop:loop,sequence:sequence};
		seneca.act(cmd,function(err,msg){
			next(null,null);
		});
	},

	hello: function (seneca,next){
		seneca.log.debug("hello called")
		next(null,["hello"]);

	},

	world: function (seneca,param,next){
		var answer="world";
		if(param[0]===answer)
			param="domination"
		// pattern matching is awesome.  Change the outcome based on flow
		var cmd = {role : 'example4', cmd : param};
		
		seneca.act(cmd,function(err,answer){
			if (err) { return cb(err); }
				next(null,answer);
			}
		);	
	}
}
