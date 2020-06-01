
Function.prototype.myCall = function(context, ...args) {
	if(typeof context === 'undefined' || context === null) {
		context = window;
	}
	if(typeof this !== 'function') throw new Error('bind 函数必须被函数调用');
	let fnSymbol = Symbol('mycall');
	context[fnSymbol] = this; // 把调用bind的函数当作 context 的属性；当context 调用该函数时， 函数内部的this就指向了 context
	const fn = context[fnSymbol](...args);
	delete context[fnSymbol];
	return fn; // 返回调用函数的值
}


// 思路和手写call一样  就是 apply的调用是传一个数组；
Function.prototype.myApply = function(context, args) {
	if(typeof context === 'undefined' || context === null) {
		context = window;
	}
	let fnSymbol = Symbol('myapply');
	context[fnSymbol] = this;
	const fn = context[fnSymbol](...args);
	delete context[fnSymbol];
	return fn;
}



// 一个绑定函数也能使用new操作符创建对象：这种行为就像把原函数当成构造器。提供的 this 值被忽略，同时调用时的参数被提供给模拟函数。

Function.prototype.bind2 = function (context, ...args) {
    if (typeof this !== "function") {
      throw new Error("Function.prototype.bind - what is trying to be bound is not callable");
	}
	if (typeof context === "undefined" || context === null) {
		context = window;
	  }
    var self = this;
    var fNOP = function () {};
    var fBound = function (...bindArgs) {
		// 当作为构造函数时，this 指向实例，此时结果为 true，将绑定函数的 this 指向该实例，可以让实例获得来自绑定函数的值
        // 当作为普通函数时，this 指向 window，此时结果为 false，将绑定函数的 this 指向 context
        return self.apply(this instanceof fNOP ? this : context, args.concat(bindArgs));
    }
	// 这里用一个空函数做中转 修改返回函数的 prototype 为绑定函数的 prototype 实例就可以继承绑定函数的原型中的值
	// 用空函数来做中转是为了 修改返回函数的 prototype 的时候不会修改 绑定函数的prototype
    fNOP.prototype = this.prototype;
    fBound.prototype = new fNOP();
    return fBound;
}