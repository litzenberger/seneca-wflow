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
	var plugin = "example2";
	//add the seneca business logic for example2
	seneca.add({role : "example2",cmd : 'hello'}, hello);
	seneca.add({role : "example2",cmd : 'domination'}, domination);

	function hello(args,cb){
		var answer="world";
		seneca.log.debug("hello "+answer);
		return cb(null,[answer]);

	}
	function domination(args,cb){
		var answer="world";
		seneca.log.debug(answer +"  domination");
		return cb(null,[answer]);

	}

	return {
		name:plugin
	}

}