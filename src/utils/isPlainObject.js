/**
 * 判断一个对象是否是plain-object   redux 中用于判断action
 * @param {*} action
 */

 function isPlainObject(action) {
	if(typeof action !== 'object') {
		return false;
	}

	return Object.getPrototypeOf(action) === Object.prototype;
 }