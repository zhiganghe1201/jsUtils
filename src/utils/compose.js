/**
 * 传入多个函数， 先执行最后一个函数把执行返回结果，作为倒数第二个函数的参数， 以此类推
 * @param  {...any} func 函数组合
 */

function compose(...funcs) {
	if(funcs.length === 0) {
		return args => args; // 如果没有要组合的函数， 则返回的函数是原封不动的返回参数的函数
	} else if(funcs.length === 1) {
		return funcs[0];
	}

	return funcs.reduce((a, b) => (...args) => a(b(...args)))
}


// eg:

function foo1(n) {
	return n * 2;
}

function foo2(n) {
	return n + n;
}

// 先调用最后面的函数，把返回的结果作为上一个函数的参数；
const newFoo = compose(foo1, foo2);