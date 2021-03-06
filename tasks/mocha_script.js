/*
 * grunt-mocha-script
 * https://github.com/tantaman/mocha-script
 *
 * Copyright (c) 2013 Matt Crinklaw-Vogt
 * Licensed under the MIT license.
 */

'use strict';

var mochascript = require('mocha-script');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  grunt.registerMultiTask('mocha_script', 'Compiles Mocha-Script sources to Javascript', function() {
    // Merge task-specific and/or target-specific options with these defaults.
    var options = this.options({
    });

    // Iterate over all specified file groups.
    this.files.forEach(function(f) {
      // Concat specified files.
      var src = f.src.filter(function(filepath) {
        // Warn on and remove invalid source files (if nonull was set).
        if (!grunt.file.exists(filepath)) {
          grunt.log.warn('Source file "' + filepath + '" not found.');
          return false;
        } else {
          return true;
        }
      }).map(function(filepath) {
        // Read file source.
        return mochascript.parse(grunt.file.read(filepath));
      }).join(grunt.util.normalizelf("\n"));

      // Write the destination file.
      grunt.file.write(f.dest, src);

      // Print a success message.
      grunt.log.writeln('File "' + f.dest + '" created.');
    });
  });

};
