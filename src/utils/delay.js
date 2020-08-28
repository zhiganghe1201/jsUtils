
/**
 * 添加一个阻塞  ms毫秒后再执行；
 * @param {*} ms 
 */
async function delay(ms = 1000) {
	return new Promise(reslove => {
		setTimeout(() => {
			reslove(ms)
		}, ms);
	})
}


delay(2000).then(res => {
	console.log(res); // 2000 
})



/**
 * 回调模式
 */

 function delay1(duration, callback) {
	 setTimeout(() => {
		 callback(null, duration)
	 }, duration);
 }

 function cb(err, d) {
	 console.log(d);
 }

 delay1(10, cb);