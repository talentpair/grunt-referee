'use strict';

var grunt = require('grunt');

/*
  ======== A Handy Little Nodeunit Reference ========
  https://github.com/caolan/nodeunit

  Test methods:
    test.expect(numAssertions)
    test.done()
  Test assertions:
    test.ok(value, [message])
    test.equal(actual, expected, [message])
    test.notEqual(actual, expected, [message])
    test.deepEqual(actual, expected, [message])
    test.notDeepEqual(actual, expected, [message])
    test.strictEqual(actual, expected, [message])
    test.notStrictEqual(actual, expected, [message])
    test.throws(block, [error], [message])
    test.doesNotThrow(block, [error], [message])
    test.ifError(value)
*/

exports.simplerverSuite = {
  tearDown: function (callback) {
    grunt.task.run('clean');
    callback();
  },
  simplerverSuite1: function(test) {
    test.expect(1);

    var pattern = /(Kashyyyk)+/g,
        specPkg = grunt.file.readJSON('test/fixtures/suite1/package.json'),
        builtSpec = grunt.file.read('test/fixtures/suite1/dist/'+ specPkg.version + '/built.js'),
        expected = pattern.exec(builtSpec) ? true : false;

    test.equal(expected, false, 'the third module shouldn\'t be in the built.js');

    test.done();
  },
  simplerverSuite2: function(test) {
    test.expect(1);

    var pattern = /(Kashyyyk)+/g,
        specPkg = grunt.file.readJSON('test/fixtures/suite2/package.json'),
        builtSpec = grunt.file.read('test/fixtures/suite2/dist/'+ specPkg.version + '/built.js'),
        expected = pattern.exec(builtSpec) ? true : false;

    test.equal(expected, true, 'the third module should be in the built.js');

    test.done();
  }
};
