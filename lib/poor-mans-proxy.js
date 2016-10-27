'use strict';

if (global.Proxy)
{
	return;
}

var decorateProperty = require('poor-mans-proxy-decorate-property');


global.Proxy = function(target, handler) {

	var proxy = Object.create(Object.getPrototypeOf(target));

	switch (typeof target)
	{
		case 'object':
			for (var prop in target)
			{
				decorateProperty(proxy, target, handler, prop);
			}
		break;

		case 'function':
			// Apply Handler
			if (handler && handler.apply && typeof handler.apply === 'function')
			{
				proxy = function() {
					return handler.apply.call(handler, target, this, arguments);
				};
			}
			else
			{
				proxy = target;
			}

			proxy.prototype = Object.getPrototypeOf(target);

			for (prop in target)
			{
				decorateProperty(proxy, target, handler, prop);
			}
		break;

		default:
			throw new TypeError('target must be an Object or a Function');
	}

	return proxy;

};
