'use strict';

module.exports = function (grunt) {

	var fs = require('fs-extra');

	var walk = function(dir) {
		var results = [],
		    list = fs.readdirSync(dir)

		list.forEach(function(file) {
			file = dir + '/' + file
			var stat = fs.statSync(file);
			if (stat && stat.isDirectory()) results = results.concat(walk(file))
			else if (file.indexOf('.css') > -1) results.push(file)
		});
		return results;
	}

	grunt.registerTask('generateTimestampCss', 'Generate Timestamp data at top of css files', function (e) {
		var task = e, // server or dist
			config = grunt.config('generateTimestampCss').options,
			src = config.src,
			cssFiles = walk(src);

		for (var i = 0; i < cssFiles.length; i++) {
			var data = fs.readFileSync(cssFiles[i], 'utf-8').trim();
			var iDate = '/* ' + new Date() + ' */\n';
			fs.outputFileSync(cssFiles[i], iDate + data);
		}
	});
};
