
/**
 * 截流函数  连续点击，过一段时间执行一次
 * @param {*} handler 
 * @param {*} wait 
 */
function throttle(handler, wait) {
	let lastTime = 0;
	return function() {
		let nowTime = new Date.getTime();
		if(nowTime - lastTime > wait) { // 第一次一定会执行
			handler.apply(this, argument);
			lastTime = nowTime;
		}
	}
}