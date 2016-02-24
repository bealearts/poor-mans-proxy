# poor-mans-proxy

ES6 [Proxy](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Proxy) pollyfill, with many limitations

> This is a best effort polyfill, as most of Proxy's functionality can not be implemented in userland.


## Install
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
		comsole.log(prop, 'accessed');
		return target[prop];
	}
});

console.log(proxy.obj);

// : name accessed 
// : Obj
```


## API


## Test

```shell
npm install
npm test
```