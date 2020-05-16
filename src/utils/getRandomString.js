/**
 * 获得指定长度的随机字符串
 * @param {*} length 
 */
function getRandomString(length) {
	// 10个数字 + 26个字符串
	return Math.random().toString(36).substr(2, length).split('').join('.')
}