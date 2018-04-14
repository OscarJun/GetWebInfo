
var express = require('express');
var router = express.Router();
var request = require('request');

module.exports = function(){
	var url = "http://xs.wxb.com/chapter?chapter_order=3&novel_id=5056",cookies = "Cookie: __guid=50703648.2618390668637321000.1523345181933.588; monitor_count=1; Hm_lvt_5859c7e2fd49a1739a0b0f5a28532d91=1523345183,1523351948,1523495355,1523605227; Hm_lpvt_5859c7e2fd49a1739a0b0f5a28532d91=1523605227; PHPSESSID=bcjibovotc4kdi0ojqlbejn1t0",url1 = "http://xs.wxb.com/chapter?chapter_order=5&novel_id=11"
	var path = url.substring(0,url.indexOf('=') + 1) + '4' + url.substring(url.indexOf('=') + 2,url.indexOf('&novel_id=') + 10) + '5056'
	// console.log(path)
	// console.log(url.substring(url.indexOf('&novel_id=') + 10))
		// $.ajax({
		// 	type:'GET',
		// 	headers:{'Cookie':cookies},
		// 	url:url,
		// 	dataType:'json',
		// 	data:{},
		// 	success:function(res){
		// 		console.log(res)
		// 	}
		// })
		// var reg = /.*\/(([^\/]+)(\/[^\/]+){2}\.[^\.]+)$/;
	var urlT = "http://xs.wxb.com/novel?novel_id=11"
	request.get({url:urlT,headers:{'Cookie':cookies}},function(err,result,data){
		// console.log(data.match(/[\u4E00-\u9FA5]+/g))
		// console.log(data.substring(data.indexOf('小说中心'),data.indexOf('<script',data.indexOf('小说中心'))))
		var reg = new RegExp(/[\u4E00-\u9FA5]+/g);
		var name = data.substring(data.indexOf('小说中心') + 8,data.indexOf('章节列表'))
		name = name.match(/[\u4E00-\u9FA5]+/g)[0]
		var Intro = data.substring(data.indexOf('>',data.indexOf('"description"'))+1,data.indexOf('</p',data.indexOf('"description"')))
		console.log(name)
		console.log(Intro)
	})
	request.get({url:url1,headers:{'Cookie':cookies}},function(err,result,data){
		// console.log(err)
		// console.log(data)
		// chapterInfo
		// console.log(data.indexOf('<script>'));
		var title = data.substring(data.indexOf('"name":"',data.indexOf('chapterInfo')) + 8,data.indexOf('"',data.indexOf('"name":"',data.indexOf('chapterInfo')) + 9));
		var a = data.substring(data.indexOf('<script>') + 8,data.indexOf('</script>',data.indexOf('<script>') + 1));
		// console.log(a)
		var content = a.substring(a.indexOf('"content":"') + 11,a.indexOf('"',a.indexOf('"content":"') + 13))
		var reg = new RegExp(/[\u4E00-\u9FA5]+/g);
		var name = data.substring(data.indexOf('小说中心') + 8,data.indexOf('<div',data.indexOf('小说中心')))
		// console.log('----------------')
		name = name.match(/[\u4E00-\u9FA5]+/g)
		// console.log(name[0])
		if (reg.test(title)) {
			// console.log(title)
		} else {
			console.log('不包含汉字')
		}
		if (reg.test(content)) {
			// console.log(content)
		} else {
			console.log('不包含汉字')
		}
	})

	// for (var i = 0; i < Things.length; i++) {
	// 	Things[i]
	// }
}
