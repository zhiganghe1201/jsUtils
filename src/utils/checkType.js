
const checkType = type => v => Object.prototype.toString.call(v) === `[object ${type}]`;

// eg

const isNumber = checkType('Number');

const str = 'abc';
let a = isNumber(str) // false