var tap = require('agraddy.test.tap')(__filename);
var response = require('agraddy.test.res');

var file = require('../');
var routes = {};
var res = response();
var res2 = response();
var res3 = response();

process.chdir('test');

(function() {
	file(routes, '/about.txt', 'other/about.txt');

	res.on('finish', function() {
		tap.assert.equal(res._body, 'about\n', 'Should parse the data.');
	});

	routes['/about.txt']({}, res);
})();

(function() {
	function header(req, res, lug, cb) {
		res.setHeader('X-Test', 'test');
		cb();
	}

	file(routes, '/another/file.txt', 'other/another.txt', [header]);

	res2.on('finish', function() {
		tap.assert.deepEqual(res2._headers[0], {"X-Test": "test"}, 'Should get header from luggage plugin.');
		tap.assert.equal(res2._body, 'another\n', 'Should get file contents.');
	});

	routes['/another/file.txt']({}, res2);
})();

(function() {
	file(routes, '^/handle/regex(/\\d+)$', 'other/handle_regex.txt');
	res3.on('finish', function() {
		tap.assert.equal(res3._body, 'handle_regex\n', 'Should handle regex.');
	});

	routes['^/handle/regex(/\\d+)$']({url: '/handle/regex/3'}, res3);
})();



/*
*/


