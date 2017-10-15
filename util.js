const util = {};

util.StringBetween = (string, ch1, ch2)=>{
	let i1 = string.lastIndexOf(ch1);
	let i2 = string.lastIndexOf(ch2);
	return string.substring(i1, i2);	
};

module.exports = util;