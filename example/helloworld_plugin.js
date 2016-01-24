"use strict"
/**
 * @fileoverview 
 * @author @litzenberger ron.litzenberger@gmail.com (ron litzenberger) 
 *
 */

var _ = require('underscore');
var async = require('async');


var exports = module.exports = function(options) {

	var seneca = this;
	var options = options;

	var noop = function () {};
	var plugin = "helloworld";
	//add the seneca business logic for helloworld
	seneca.add({role : "helloworld",cmd : 'hello'}, hello);
	seneca.add({role : "helloworld",cmd : 'domination'}, domination);

	function hello(args,cb){
		var answer="world";
		seneca.log.debug("hello "+answer);
		console.log("hello "+answer);
		return cb(null,[answer]);

	}
	function domination(args,cb){
		var answer="world";
		seneca.log.debug(answer +"  domination");
		console.log(answer +"  domination");
		return cb(null,[answer]);

	}

	return {
		name:plugin
	}

}