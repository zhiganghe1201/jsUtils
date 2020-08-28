/**
 * js 实现最大并发请求  Promise 的实现
 */

 /**
  * 通常业务中我们经常遇到在多个异步请求后再执行相应的代码, 这时会用到 Promise.all(promises: []).then(fun: function)
  * Promise.all 保证数组中的请求是并行的, 并且所有的对象都达到resolve状态, 才执行then 回调;
  */

  /**
   * 这时候考虑一个场景：如果你的promises数组中每个对象都是http请求，或者说每个对象包含了复杂的调用处理。而这样的对象有几十万个。
   * 那么会出现的情况是，你在瞬间发出几十万http请求（tcp连接数不足可能造成等待），或者堆积了无数调用栈导致内存溢出。
   * 这时候，我们就需要考虑对Promise.all做并发限制。
   * Promise.all并发限制指的是，每个时刻并发执行的promise数量是固定的，最终的执行结果还是保持与原来的Promise.all一致。
   */


   function asyncPool(poolLimit, array, iteratorFn) {
	   let i = 0;
	   const ret = [];
	   const executing = [];
	   const enqueue = () => {
		   // 边界处理, array 数组为空数组;
		   if(i === array.length) {
			   return Promise.resolve();
		   }

			const item = array[i++];
			const p = Promise.resolve().then(() => iteratorFn(item, array));
			ret.push(p); // 放入promise 数组

			let r = Promise.resolve();

			if(poolLimit <= array.length) { // 如果限制的并行数小于 数组最大长度 直接递归;
				const e = p.then(() => executing.splice(executing.indexOf(e), 1)); // promise执行完毕，从executing数组中删除
				executing.push(e);
	
				if(executing.length >= poolLimit) {
					// 使用Promise.rach 当executing数组中promise 数量低于poolLimut , 就实例化新的Pomise 并执行
					// 使用Promise.race，获得executing中promise的执行情况，当有一个promise执行完毕，继续初始化promise并放入executing中
					r = Promise.race(executing); 
				}

		   }
		   return r.then(() => enqueue()); // 递归，直到遍历完array


	   }

	   return enqueue().then(() => Promise.all(ret));
   }

	const timeout = i => new Promise(resolve => setTimeout(() => resolve(i), i));
	asyncPool(2, [1000, 5000, 3000, 2000], timeout).then(results => {
		console.log(results);
	});