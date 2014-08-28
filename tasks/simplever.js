/*
 * grunt-simplever
 * https://github.com/talentpair/grunt-simplever
 *
 * Copyright (c) 2014 Scott Sword
 * Licensed under the MIT license.
 */

'use strict';

var fs = require('fs'),
    colors = require('colors'),
    _ = require('lodash');

module.exports = function(grunt) {

  // Please see the Grunt documentation for more information regarding task
  // creation: http://gruntjs.com/creating-tasks

  var defaults = {
    baseUrl: '../../../',
    pattern: /(rc)+/g,
    warning: 'WARNING!!! This version has already been released.'.red,
    tasks: ['build']
  };


  grunt.registerMultiTask('simplever', 'Prevents overriding releases, but makes exceptions for custom patterns.', function simplever() {

    var config = _.extend(defaults, this.options()),
        pkg = grunt.file.readJSON(config.baseUrl + 'package.json'),
        destination = config.baseUrl + 'dist/' + pkg.version,
        buildExists,
        runTasks,
        build;

        runTasks = function runTasks() {
          grunt.task.run(config.tasks);
        };

        buildExists = function buildExists(version) {
          if (fs.existsSync(config.baseUrl + 'dist/' + version)) {
            return false;
          } else {
            grunt.log.writeln();
            grunt.log.writeln('**************************'.green);
            grunt.log.writeln('RELEASING - Version ' + pkg.version.cyan);
            grunt.log.writeln('**************************'.green);
            return true;
          }
        };

        build = config.pattern.exec(destination) || buildExists(pkg.version) ?
          runTasks() : (function warn() { 
            grunt.log.writeln();
            return grunt.log.writeln(config.warning);
        })();

  });

};