"use strict"

/**
 * @fileoverview defines the worklfow 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 *
 */

module.exports = {

	hello: function (seneca,next){
		seneca.log.debug("hello called")
		next(null,["hello"]);

	},

	world: function (seneca,param,next){
		var answer="world";
		if(param[0]===answer)
			param="domination"
		// patterne matching is awesome.  Change the outcome based on flow
		var cmd = {role : 'example2', cmd : param};
		
		seneca.act(cmd,function(err,answer){
			if (err) { return cb(err); }
				next(null,answer);
			}
		);	
	}
}
