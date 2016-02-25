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

			for (prop in target)
			{
				wrapProperty(proxy, target, handler, prop);
			}
		break;

		default:
			throw new TypeError('target must be an Object or a Function');
	}

	return proxy;

};


/* PRIVATE */


function wrapProperty(proxy, target, handler, prop)
{
	var meta = getPropertyMeta(target, prop);

	delete meta.value;
	
	var writable = meta.writable;
	delete meta.writable;


	// Get Handler
	if (handler && handler.get && typeof handler.get === 'function')
	{
		meta.get = function() {
			var result = handler.get.call(handler, target, prop, this);
			
			if (!writable && result !== target[prop])
			{
				throw new TypeError('Invariant check failed');
			}

			return result;
		};
	}
	else
	{
		meta.get = function() {
			return target[prop];
		};
	}

	// Set Handler
	if (writable)
	{	
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



function getPropertyMeta(target, prop)
{
	var meta = Object.getOwnPropertyDescriptor(target, prop);

	if (meta)
	{
		return meta;
	}

	var proto = Object.getPrototypeOf(target);

	if (proto)
	{
		return getPropertyMeta(proto, prop); 
	}

	return {}; 
}