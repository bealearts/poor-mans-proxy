'use strict';

require('../');

/*jshint -W079 */
var expect = require('chai').expect;


describe('Object Proxy', function() {
	
	describe('for getting properties', function() {

		it('should be transparent without a handler', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target);

			expect(proxy.value).to.equal(5);

			proxy.value = 7;

			expect(target.value).to.equal(7);

		});


		it('should be not transparent with a handler', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target, {
				get: function(target, prop, receiver) {
					// Do Nothing
				}
			});

			expect(proxy.value).to.equal(undefined);

		});


		it('should be transparent with a handler that delegates to the target', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target, {
				get: function(target, prop, receiver) {
					return target[prop];
				}
			});

			expect(proxy.value).to.equal(5);

		});


		it('should support prototype chains', function() {

			var target = Object.create({
				value: 5
			});

			var proxy = new Proxy(target, {
				get: function(target, prop, receiver) {
					return target[prop];
				}
			});

			expect(proxy.value).to.equal(5);

		});

	});


	describe('for setting properties', function() {

		it('should be transparent without a handler', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target);

			proxy.value = 7;

			expect(target.value).to.equal(7);

		});

		it('should not be transparent with a handler', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target, {
				set: function(target, prop, value, receiver) {
					// Do Nothing
				}
			});

			proxy.value = 7;

			expect(target.value).to.equal(5);

		});

		it('should be transparent with a handler that delegates to the target', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target, {
				set: function(target, prop, value, receiver) {
					target[prop] = value;
				}
			});

			proxy.value = 7;

			expect(target.value).to.equal(7);

		});

	});


	describe('for calling functions', function() {

		it('should be transparent without a handler', function() {

			var target = {
				value: 5,
				method: function(arg) {
					this.value = arg;
				}
			};

			var proxy = new Proxy(target);

			proxy.method(8);

			expect(target.value).to.equal(8);

		});

		it('should not be transparent with a handler', function() {

			var target = {
				value: 5,
				method: function(arg) {
					this.value = arg;
				}
			};

			var proxy = new Proxy(target, {
				get: function(target, prop, receiver) {
					return function() {};	// Do Nothing
				}
			});

			proxy.method(8);

			expect(target.value).to.equal(5);

		});

		it('should be transparent with a handler that delegates to the target', function() {

			var target = {
				value: 5,
				method: function(arg) {
					this.value = arg;
				}
			};

			var proxy = new Proxy(target, {
				get: function(target, prop, receiver) {
					return target[prop];
				}
			});

			proxy.method(8);

			expect(target.value).to.equal(8);

		});
	});


	it('should have the prototype of the target', function() {

		var proto = {};

		var target = Object.create(proto);

		expect(Object.getPrototypeOf(target)).to.equal(proto);

		var proxy = new Proxy(target, {});

		expect(Object.getPrototypeOf(proxy)).to.equal(proto);

	});

	it('can be an object prototype', function() {

		var proto = new Proxy({
				value: 5
			},
			{
				get: function(target, prop, receiver) {
					return 3;
				}
			}
		);

		var obj = Object.create(proto);
		
		expect(obj.value).to.equal(3);

	});

	describe('invariants', function() {

		it ('should be maintained', function() {

			var target = Object.defineProperties({}, {
				bar: {
					value: 456,
					enumerable: true,
					writable: false,
					configurable: false
				}
			});
			
			var proxy = new Proxy(target, {
				get: function(target, prop) {
					return 'abc';
				}
			});

			expect(function() {
				proxy.bar;
			}).to.throw('Invariant check failed');

		});

	});

});