/*
 * grunt-referee
 * https://github.com/talentpair/grunt-referee
 *
 * Copyright (c) 2014 Scott Sword
 * Licensed under the MIT license.
 */

'use strict';

module.exports = function(grunt) {

  var versions = {
    suite1: require('./test/fixtures/suite1/package.json').version,
    suite2: require('./test/fixtures/suite2/package.json').version
  };

  // Project configuration.
  grunt.initConfig({
    jshint: {
      all: [
        'Gruntfile.js',
        'tasks/*.js',
        'test/fixtures/*.js'
      ],
      options: {
        jshintrc: '.jshintrc'
      }
    },
    concat: {
      options: {
        separator: ';',
      },
      distOne: {
        src: [
          'test/fixtures/module-one.js', 'test/fixtures/module-two.js'],
        dest: 'test/fixtures/suite1/dist/' + versions.suite1 + '/built.js',
      },
      distOneChange: {
        src: [
          'test/fixtures/module-one.js',
          'test/fixtures/module-two.js',
          'test/fixtures/module-three.js'
        ],
        dest: 'test/fixtures/suite1/dist/' + versions.suite1 + '/built.js',
      },
      distTwo: {
        src: ['test/fixtures/module-one.js', 'test/fixtures/module-two.js'],
        dest: 'test/fixtures/suite2/dist/' + versions.suite2 + '/built.js',
      },
      distTwoChange: {
        src: [
          'test/fixtures/module-one.js',
          'test/fixtures/module-two.js',
          'test/fixtures/module-three.js'
        ],
        dest: 'test/fixtures/suite2/dist/' + versions.suite2 + '/built.js',
      }
    },
    clean: ['test/fixtures/suite1/dist', 'test/fixtures/suite2/dist'],
    nodeunit: {
      all: ['test/**/*-spec.js']
    },
    referee: {
      initialReleaseOne: {
        options: {
          tasks: [
            'jshint',
            'concat:distOne'
          ],
          baseUrl: 'test/fixtures/suite1/'
        }
      },
      initialReleaseTwo: {
        options: {
          tasks: [
            'jshint',
            'concat:distTwo'
          ],
          baseUrl: 'test/fixtures/suite2/'
        }
      },
      buildOne: {
        options: {
          tasks: [
            'jshint',
            'concat:distOneChange'
          ],
          baseUrl: 'test/fixtures/suite1/'
        }
      },
      buildTwo: {
        options: {
          tasks: [
            'jshint',
            'concat:distTwoChange'
          ],
          baseUrl: 'test/fixtures/suite2/'
        }
      }
    }

  });

  // Actually load this plugin's task(s).
  grunt.loadTasks('tasks');

  // These plugins provide necessary tasks.
  grunt.loadNpmTasks('grunt-contrib-concat');
  grunt.loadNpmTasks('grunt-contrib-jshint');
  grunt.loadNpmTasks('grunt-contrib-clean');
  grunt.loadNpmTasks('grunt-contrib-nodeunit');

  // By default, lint and run all tests.
  grunt.registerTask('default', ['jshint']);

  grunt.registerTask('test', [
    'clean',
    'referee:initialReleaseOne',
    'referee:initialReleaseTwo',
    'referee:buildOne',
    'referee:buildTwo',
    'nodeunit'
  ]);

};
