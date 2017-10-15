const scrapperLogic = {};
const cheerio = require('cheerio');

scrapperLogic.getScreenshotsCDN = (html)=>{
	$ = cheerio.load(html);
	let cdnArray = [];
	let screenArray = $('#highlight_strip_scroll');
	console.log(screenArray);
	if(screenArray[0]){
		screenArray[0].children.forEach((child,index)=>{
			if(child.type==='tag' && child.name === 'div'){
				flag = true;
				child.children.forEach((baby)=>{
					if(baby.attribs && baby.attribs.class !== 'movie_thumb' && baby.attribs.src !== undefined ){
						let src = baby.attribs.src.replace('116x65','600x338');
						console.log(src);
						cdnArray.push(src);
					}
				})
			}
		});
	}
	
	if(cdnArray.length>0){
		return cdnArray;
	}
	return false
};

scrapperLogic.getTitilePicture = (html)=>{
	$ = cheerio.load(html);
	let mainPic = $('.game_header_image_full');
	//console.log(mainPic);
	if(mainPic[0] && mainPic[0].attribs && mainPic[0].attribs.src){
		return mainPic[0].attribs.src;
	}
	let validPic = $('.agegate_img_app');
	if(validPic[0] && validPic[0].attribs && validPic[0].attribs.src){
		return validPic[0].attribs.src;
	}
	return false;
};

module.exports = scrapperLogic;