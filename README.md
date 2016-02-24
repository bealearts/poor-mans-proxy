# poor-mans-proxy

ES6 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) pollyfill, with many limitations

> This is a best effort polyfill, as most of Proxy's functionality can not be implemented in userland.


## Install [![Build Status](https://travis-ci.org/bealearts/poor-mans-proxy.svg)](https://travis-ci.org/bealearts/poor-mans-proxy) [![npm version](https://badge.fury.io/js/poor-mans-proxy.svg)](http://badge.fury.io/js/poor-mans-proxy)
```shell
npm install poor-mans-proxy --save
```


## Usage
```js
require('poor-mans-proxy');

var obj = {
	name: 'Obj'
};

var proxy = new Proxy(obj, {
	get: function(target, prop, receiver) {
		console.log(prop, 'accessed');
		return target[prop];
	}
});

console.log(proxy.obj);

// : name accessed 
// : Obj
```


## API

#### `new Proxy(target [, handler])`

Creates a Proxy of the target object, with handlers defined by the handler object.

**_target_** `Object|Function` Object or Function to proxy. 

**_handler_** `Object` Handler definitions.

> **_.get = function(target, property, receiver)_** The handler.get() method is a trap for getting a property value. See [Get](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get)

> **_.set = function(target, property, value, receiver)_** The handler.set() method is a trap for setting a property value. See [Set](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/get)

> **_.apply = function(target, thisArg, argumentsList)_** The handler.apply() method is a trap for a function call. See [Apply](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy/handler/apply)

The `target` object's properties must be defined before calling `new Proxy()`. Dynamic properties are not supported.

## Test

```shell
npm install
npm test
```