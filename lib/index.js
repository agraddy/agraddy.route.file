var drop = require('agraddy.drop.file');
var luggage = require('agraddy.luggage');

var mod;

mod = function(routes, url, src, plugins) {
	if(plugins) {
		routes[url] = function(req, res) {
			luggage(req, res, plugins, drop(src));
		};
	} else {
		routes[url] = function(req, res) {
			drop(src)(null, req, res);
		};
	}
}

module.exports = mod;
