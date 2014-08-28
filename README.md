# grunt-referee [![Build Status](https://travis-ci.org/talentpair/grunt-referee.svg?branch=master)](https://travis-ci.org/talentpair/grunt-referee) [![NPM version](https://badge.fury.io/js/grunt-referee.svg)](http://badge.fury.io/js/grunt-referee)

> Prevents overwriting a previously built project (typically referred to as a release), but makes exceptions for custom patterns. This plugin reads from the `package.json` for the version and won't run a task if that version already exists. If you wish to overwite a version for development you can add "rc" to the end of your version in `package.json`. If you wish to use something other than rc you can set a custom pattern.


## Getting Started
This plugin requires Grunt `~0.4.5`

If you haven't used [Grunt](http://gruntjs.com/) before, be sure to check out the [Getting Started](http://gruntjs.com/getting-started) guide, as it explains how to create a [Gruntfile](http://gruntjs.com/sample-gruntfile) as well as install and use Grunt plugins. Once you're familiar with that process, you may install this plugin with this command:

```shell
npm install grunt-referee --save-dev
```

Once the plugin has been installed, it may be enabled inside your Gruntfile with this line of JavaScript:

```js
grunt.loadNpmTasks('grunt-referee');
```

## The "referee" task

### Overview
In your project's Gruntfile, add a section named `referee` to the data object passed into `grunt.initConfig()`.

```js
grunt.initConfig({
  referee: {
      build: {
        options: {
          pattern: /(rc)+/g,
          tasks: [
            'clean:dist',
            'wiredep',
            'useminPrepare',
            'concurrent:dist',
            'autoprefixer',
            'concat',
            'ngmin',
            'cdnify',
            'cssmin',
            'uglify',
            'usemin',
            'htmlmin'
          ]
        }
      }
    },
});
```

### Options

#### options.baseUrl
Type: `String`
Default value: `../../../`

The default is the standard fs for node modules.

#### options.pattern
Type: `Regex`
Default value: `/(rc)+/g`

A pattern that determines your version is safe to overwrite. *Typically used for development. *rc = release candidate.

#### options.tasks
Type: `Array`
Default value: `['build']`

The tasks that you want to run when you "build" you're project.

#### options.warning
Type: `String`
Default value: `WARNING!!! - Version {{version}} has already been released and cannot be overwritten.`

A warning message to display when someone tries to build the a project that has already been built.

### Usage Examples

#### Default Options
As stated before, the default task the plugin runs if no tasks are it `build`. The main purpose of
this plugin is to provide a layer of protection of the version you want to release and the build standard
build task you use which can sometimes be distructive.

```js
grunt.initConfig({
  referee: {
    options: {}
  },
});

// Your projects build tasks
grunt.registerTask('build', ['clean', 'lesslint', 'jshint', 'cssmin', 'concat']);

// Alias for referee
grunt.registerTask('release', ['referee']);
```

#### Custom Options
If you wish, you can overwrite the default referee settings. The example below completely removes
the afformentioned `build` task and funnels everything through referee.

```js
grunt.initConfig({
  referee: {
    options: {
      pattern: /(rc)+/g,
      warning: 'Yo fool, you already released that.',
      tasks: [
        'clean',
        'lesslint',
        'jshint',
        'cssmin',
        'concat'
      ]
    }
  },
});
```

## Contributing
In lieu of a formal styleguide, take care to maintain the existing coding style. Add unit tests for any new or changed functionality. Lint and test your code using [Grunt](http://gruntjs.com/).

## Release History
_(Nothing yet)_
