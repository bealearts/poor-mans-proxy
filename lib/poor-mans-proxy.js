'use strict';

if (global.Proxy)
{
	return;
}

global.Proxy = function(target, handler) {

	var proxy = {};

	for (var prop in target)
	{
		wrapProperty(proxy, target, handler, prop);
	}

	return proxy;

};


/* PRIVATE */


function wrapProperty(proxy, target, handler, prop)
{
	var getter = function() {
		return target[prop];
	};

	var setter = function(value) {
		return target[prop] = value;
	};

	if (handler && handler.get && typeof handler.get === 'function')
	{
		getter = function() {
			handler.get.call(null, target, prop, this);
		};
	}

	if (handler && handler.set && typeof handler.set === 'function')
	{
		setter = function() {
			handler.set.call(null, target, prop, this);
		};
	}

	Object.defineProperty(proxy, prop, {
		get: getter,
		set: setter
	});	
}