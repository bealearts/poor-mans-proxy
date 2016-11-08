'use strict';

var Proxy = require('../');

/*jshint -W079 */
var expect = require('chai').expect;


describe('Function Proxy', function() {


	it('should be transparent without a handler', function() {

		var target = function(arg) {
			return arg;
		};

		var proxy = new Proxy(target);

		expect(proxy(8)).to.equal(8);

	});

	it('should not be transparent with a handler', function() {

		var target = function(arg) {
			return arg;
		};

		var proxy = new Proxy(target, {
			apply: function(target, thisArg, argumentsList) {
				return 0;
			}
		});

		expect(proxy(8)).to.equal(0);

	});

	it('should be transparent with a handler that delegates to the target', function() {

		var target = function(arg) {
			return arg;
		};

		var proxy = new Proxy(target, {
			apply: function(target, thisArg, argumentsList) {
				return target.apply(thisArg, argumentsList);
			}
		});

		expect(proxy(8)).to.equal(8);

	});


	it('should support properties', function() {

		var target = function(arg) {
			return arg;
		};

		target.value = 4;

		var proxy = new Proxy(target, {
			apply: function(target, thisArg, argumentsList) {
				return target.apply(thisArg, argumentsList);
			}
		});

		expect(proxy(8)).to.equal(8);

		expect(proxy.value).to.equal(4);

	});

});
