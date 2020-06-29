
/**
 * 添加一个阻塞  ms毫秒后再执行；
 * @param {*} ms 
 */
function delay(ms) {
	return new Promise(reslove => {
		setTimeout(() => {
			reslove()
		}, ms);
	})
}