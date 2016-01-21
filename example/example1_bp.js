"use strict"
/**
 * @fileoverview defines the worklfow 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 * Example 1: example to show how to set inital flow and then modify flow. 
 */
 
module.exports = {


	hello: function (seneca,next){
		seneca.log.debug("hello called")
		next(null,["hello"]);

	},

	world: function (seneca,param,next){
		seneca.log.debug("world called")
		var answer="world"
		if(param[0]===answer)
			answer="domination"
		seneca.log.debug(param +" "+answer);
		next(null,[answer]);
		
	}

}