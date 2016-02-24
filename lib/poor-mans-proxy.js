'use strict';

if (global.Proxy)
{
	return;
}

global.Proxy = function(target, handler) {

	var proxy = {};

	switch (typeof target)
	{
		case 'object':
			for (var prop in target)
			{
				wrapProperty(proxy, target, handler, prop);
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
		break;
	}

	return proxy;

};


/* PRIVATE */


function wrapProperty(proxy, target, handler, prop)
{
	var meta = Object.getOwnPropertyDescriptor(target, prop);

	delete meta.value;

	// Get Handler
	if (handler && handler.get && typeof handler.get === 'function')
	{
		meta.get = function() {
			return handler.get.call(handler, target, prop, this);
		};
	}
	else
	{
		meta.get = function() {
			return target[prop];
		};
	}

	// Set Handler
	if (meta.writable)
	{
		delete meta.writable;

		if (handler && handler.set && typeof handler.set === 'function')
		{
			meta.set = function(value) {
				handler.set.call(handler, target, prop, value, this);
			};
		}
		else
		{
			meta.set = function(value) {
				target[prop] = value;
			};
		}
	}		

	Object.defineProperty(proxy, prop, meta);	
}