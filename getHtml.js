const request = require('request');
const getHtml = {};

getHtml.insertUrl((url,functionList)=>{
	request(url, (error, response, html)=>{
	if(!error){
		functionList.forEach((fn)=>{
			fn.apply(html);
		});
	}
})
})