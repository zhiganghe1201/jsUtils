

/**
 * 防抖函数 点击后一段时间没有再次点击 执行
 * @param {*} handler 
 * @param {*} delay 
 */
function debounce(handler, delay) {
	let timer = null;
	return function () {
		let _self = this, _args = arguments;
		clearTimeout(tiemr);
		timer = setTimeout(() => {
			handler.apply(_self, _args)
		}, delay);
	}
}