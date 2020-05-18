/**
 * 柯里化 实现add(1)(2,3,4)(5)
 */

 function curryingAdd() {
	 let _args = [...arguments];

	 let fn = function() {
		 _args.push(...arguments);
		 return fn;
	 }

	 fn.toString = function() {
		 console.log(_args);
		 
		 return _args.reduce((prev, cur) => prev + cur)
	 }
	 return fn;
 }



 // add(1)(2)(3)

 function add(a) {
	function s(b) {
		a += b;
		return s;
	}

	s.toString = function() {
		return a;
	}

	return s
 }

 

 // eg: 
let sum = curryingAdd(1)(2,3)(4); 

console.log(sum == 10);


// 手写bind  柯里化应用

var foo = {
    x: 888
}
var bar = function(e) {
    console.log(this.x, e)
}

Function.prototype.testBind = function(scope) {
	let fn = this;
	return function() {
		fn.apply(scope, [...arguments])
	}
}

// bar.testBind(foo)(23232)