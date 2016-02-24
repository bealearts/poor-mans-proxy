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

		it('should not be transparent without a handler', function() {

			var target = {
				value: 5
			};

			var proxy = new Proxy(target, {
				set: function(target, prop, receiver) {
					// Do Nothing
				}
			});

			proxy.value = 7;

			expect(target.value).to.equal(5);

		});

	});

});