const express = require('express');
const request = require('request');
const cheerio = require('cheerio');
const fs = require('fs');
const app = express();

const scrapperLogic = require('./scrapperLogic.js');
const util = require('./util.js');
//const getHtml = require('./getHtml.js');

app.set('view engine', 'ejs');

app.listen(8888,()=>{
	console.log("Server is up");
})

app.get('/',(request, response)=>{
	response.render('index');
})
app.get('/display_img',(req, response)=>{
	let url = req.query.urlInput;
	console.log(url);
	request(url, (error, res, html)=>{
	if(!error){
		// console.log('634517');
		//  console.log(scrapperLogic.getTitilePicture(html));
		// console.log(scrapperLogic.getScreenshotsCDN(html));
		response.render('display_img',{mainImg:scrapperLogic.getTitilePicture(html), cdnArray:scrapperLogic.getScreenshotsCDN(html)});
	}
	})
})
const array = [];
request({url:'https://igdbcom-internet-game-database-v1.p.mashape.com/games/?fields=name,cover,aggregated_rating&order=popularity:desc',headers: {'X-Mashape-Key': 'PZzFnwlUa7mshIR29b7zMporUI45p16v4AejsnayIdsA9wY2nj','Accept': 'application/json'}},(error, req, res)=>{
	if(Array.isArray(JSON.parse(res))){
		JSON.parse(res).forEach(function (game) {
		array.push(game.name);
		let x = game.name.split(' ').join('+');
		getTitle(x, game.name);
	})
	}else{
		console.log(JSON.parse(res));
	}
	console.log(array);
})

function getTitle (url,name) {
	let googleParsedUrl  = 'https://www.google.co.in/search?q=steam+'+url+'+&oq=steam+'+url;
	console.log(googleParsedUrl);
	request(googleParsedUrl, (error, resse, html)=>{
	if(!error){
	$ = cheerio.load(html);
	let cdnArray = [];
	let screenArray = $('#search').find('a');
	if(screenArray[0]){
		//console.log(screenArray[0].attribs.href);
		let firstLinkGoogle = screenArray[0].attribs.href;
	if(firstLinkGoogle.lastIndexOf())
	let y  = util.StringBetween(screenArray[0].attribs.href, 'http', '/&sa')
	console.log( name , '*->', x);
	request(x, (error, res, html)=>{
	if(!error){
		console.log(name, ' -> ', scrapperLogic.getTitilePicture(html));
	}
	});
	}else{
		console.log(name, ' -> ', 'Nahi mila');
		let fileName = name.replace(' ','_')+'.html';
		let wstream = fs.createWriteStream(fileName);
		wstream.write(html);
		console.log(fileName+' Created');
	}
	}else{
		console.log(name, ' -> ', 'Not found');

	}
})
}
request('https://www.origin.com/ind/en-us/store/fifa/fifa-18/standard-edition',(error, res, html)=>{
	// $ = cheerio.load(html);
	// let screenArray = $('.origin-pdp-packart');
	//console.log(html);
})

