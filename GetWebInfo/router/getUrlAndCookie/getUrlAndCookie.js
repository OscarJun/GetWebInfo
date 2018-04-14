
var express = require('express');
// var fs = require('fs');//引入node的文件(夹)读写包
var router = express.Router();
var request = require('request');
var app = express();
var routeSql = require('../sql/routeSql.js');
var Sequelize = require('sequelize');
var sequelize = require('../sql/sqlConnect.js')
var Ipconfig = require('../Ipconfig/Ipconfig.js')

module.exports = function(data){
	var Model = [
		{
			titlebefor:'新章节《',
			titleend:'》大结局在线免费阅读全文',
			keyWord:',免费小说，在线阅读，全文，完整版',
			Picture:'zb_users/upload/2018/01/1.jpg'
		},{
			titlebefor:'最新热门小说《',
			titleend:'》免费在线阅读全章节目录',
			keyWord:'，TXT，免费下载，全文免费阅读，最新小说',
			Picture:'zb_users/upload/2018/01/2.jpg'
		},{
			titlebefor:'言情小说《',
			titleend:'》在线阅读免费小说TXT',
			keyWord:'，都市言情，热门小说，无广告，最新章节',
			Picture:'zb_users/upload/2018/01/3.jpg'
		},{
			titlebefor:'经典热书《',
			titleend:'》全文在线免费阅读',
			keyWord:'，无删减小说，免费阅读，免费在线阅读，阅读',
			Picture:'zb_users/upload/2018/01/4.jpg'
		},{
			titlebefor:'长篇小说《',
			titleend:'》在线全文免费阅读',
			keyWord:'，小说免费，小说免费阅读，全文免费阅读，完整版小说',
			Picture:'zb_users/upload/2018/01/5.jpg'
		},{
			titlebefor:'推文《',
			titleend:'》小说全文完整版在线免费阅读全文',
			keyWord:'，在线全文阅读，小说阅读，小说TXT，无删减',
			Picture:'zb_users/upload/2018/01/6.jpg'
		},{
			titlebefor:'',
			titleend:'小说免费阅读完整版无弹窗',
			keyWord:'，经典小说，目录，全文，章节',
			Picture:'zb_users/upload/2018/01/7.jpg'
		},{
			titlebefor:'无删减小说《',
			titleend:'》新章节在线阅读全文免费阅读',
			keyWord:'，免费全文，免费完整版，免费章节，精选小说',
			Picture:'zb_users/upload/2018/01/8.jpg'
		},{
			titlebefor:'言情小说《',
			titleend:'》免费阅读TXT最新章节在线连载',
			keyWord:'，小说，小说在线看，小说在线阅读，免费小说',
			Picture:'zb_users/upload/2018/01/9.jpg'
		},{
			titlebefor:'《',
			titleend:'》小说大结局在线免费阅读全文',
			keyWord:'，经典全文，最新章节，完整版，txt',
			Picture:'zb_users/upload/2018/01/10.jpg'
		},{
			titlebefor:'总裁小说《',
			titleend:'》在线txt免费阅读',
			keyWord:'，txt下载，无删减txt，免费，全文阅读',
			Picture:'zb_users/upload/2018/01/11.jpg'
		},{
			titlebefor:'小说《',
			titleend:'》全文在线免费阅读',
			keyWord:'，言情小说，总裁豪门，豪门小说，言情免费',
			Picture:'zb_users/upload/2018/01/12.jpg'
		},{
			titlebefor:'强推小说《',
			titleend:'》全文章节阅读免费小说大结局免费',
			keyWord:'，免费言情，免费阅读，小说，完整',
			Picture:'zb_users/upload/2018/01/13.jpg'
		},{
			titlebefor:'最新小说《',
			titleend:'》在线免费阅读TXT章节',
			keyWord:'，最新全文，小说在线阅读，免费小说，免费',
			Picture:'zb_users/upload/2018/01/14.jpg'
		},{
			titlebefor:'热门小说《',
			titleend:'》在线txt免费阅读',
			keyWord:'，免费，阅读，全文，在线',
			Picture:'zb_users/upload/2018/01/15.jpg'
		},{
			titlebefor:'完整版小说《',
			titleend:'》免费在线阅读全文小说免费阅读',
			keyWord:'，全文，全文免费，全文在线，全文阅读',
			Picture:'zb_users/upload/2018/01/16.jpg'
		},{
			titlebefor:'大结局《',
			titleend:'》小说无删减全文免费小说新章节全文在线',
			keyWord:'，小说，小说免费，小说免费阅读，小说在线阅读',
			Picture:'zb_users/upload/2018/01/17.jpg'
		},{
			titlebefor:'最新最热后宫言情小说《',
			titleend:'》完结篇',
			keyWord:'，小说阅读，小说无删减，小说全文，小说',
			Picture:'zb_users/upload/2018/01/18.jpg'
		},{
			titlebefor:'经典小说《',
			titleend:'》全文完结在线阅读最新章节目录',
			keyWord:'，免费，免费小说，免费阅读，完整版',
			Picture:'zb_users/upload/2018/01/19.jpg'
		},{
			titlebefor:'都市言情小说《',
			titleend:'》全文免费阅读完整版',
			keyWord:'，TXT，TXT下载，免费阅读，免费小说',
			Picture:'zb_users/upload/2018/01/20.jpg'
		},
	]
	var wxgzhName = data.wxgzhName;
	var Cookie = data.cookies;
	var beginNumber = data.beginNumber;
	var lastNumber = data.lastNumber;
	getNewSheet(beginNumber)
	function getNewSheet(novel_id){
		if (parseInt(novel_id) < parseInt(lastNumber)) {
			var SaveData = {}
			SaveData.section = 1;
			var urlT = "http://xs.wxb.com/novel?novel_id=" + novel_id
			request.get({url:urlT,headers:{'Cookie':Cookie}},function(err,result,data){
				// console.log(data.match(/[\u4E00-\u9FA5]+/g))
				// console.log(data.substring(data.indexOf('小说中心'),data.indexOf('<script',data.indexOf('小说中心'))))
				var reg = new RegExp(/[\u4E00-\u9FA5]+/g);
				var name = data.substring(data.indexOf('小说中心') + 8,data.indexOf('章节列表'))
				SaveData.name = name.match(/[\u4E00-\u9FA5]+/g)[0]
				SaveData.Intro = data.substring(data.indexOf('>',data.indexOf('"description"'))+1,data.indexOf('</p',data.indexOf('"description"'))) + '<!--autointro-->'
				saveToMysql(SaveData,novel_id)
			})
		} else {
			console.log('上传完成')
		}
	}
	function saveToMysql(SaveData,novel_id){
		var url = "http://xs.wxb.com/chapter?chapter_order=" + SaveData.section + "&novel_id=" + novel_id;
		request.get({url:url,headers:{'Cookie':Cookie}},function(err,result,data){
			if (err) {
				console.log(err)
				getNewSheet(parseInt(novel_id) + 1)
			} else {
				var title = data.substring(data.indexOf('"name":"',data.indexOf('chapterInfo')) + 8,data.indexOf('"',data.indexOf('"name":"',data.indexOf('chapterInfo')) + 9));
				var a = data.substring(data.indexOf('<script>') + 8,data.indexOf('</script>',data.indexOf('<script>') + 1));
				var content = a.substring(a.indexOf('"content":"') + 11,a.indexOf('"',a.indexOf('"content":"') + 13))
				content = '<p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 15px; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; white-space: normal; widows: 1; background-color: rgb(255, 255, 255);"><span>' + content
				content = content.replace(/\\n/g,'</span></br></br><span>')
				content = content + '</span></p>'
				content = '<p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><a href="{#ZC_BLOG_HOST#}" target="_self">' + SaveData.name + '</a>简介：' + SaveData.Intro + '</p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="color: #555555; font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; text-align: justify; widows: 1; background-color: #FFFFFF;">=================================================</span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="color: #FF0000;">《<a href="{#ZC_BLOG_HOST#}" target="_self"><span style="box-sizing: border-box; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;">' + SaveData.name + '</span></a><span style="box-sizing: border-box; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;">》已出全文</span></span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">阅读全文请搜索关注微信公众号：' + wxgzhName + '</span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">回复小说名字 即可继续阅读全文章节</span></p><p><span style="color: #555555; font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; text-align: justify; widows: 1; background-color: #FFFFFF;">=================================================</span></p><p></p>' + content + '<p><span style="color: #555555; font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; text-align: justify; widows: 1; background-color: #FFFFFF;"></span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);">=================================================</p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="color: #FF0000;">《<a href="{#ZC_BLOG_HOST#}" target="_self"><span style="box-sizing: border-box; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;">' + SaveData.name + '</span></a><span style="box-sizing: border-box; font-family: 微软雅黑, 宋体, Arial, Helvetica, sans-serif;">》已出全文</span></span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">阅读全文请搜索关注微信公众号：' + wxgzhName + '</span></p><p style="margin-top: 0px; margin-bottom: 15px; white-space: normal; box-sizing: border-box; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">回复小说名字 即可继续阅读全文章节</span></p><p style="white-space: normal;"><span style="color: #555555; font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; text-align: justify; widows: 1; background-color: #FFFFFF;">=================================================</span></p><p><span style="color: #555555; font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; text-align: justify; widows: 1; background-color: #FFFFFF;"><br/></span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 15px; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; white-space: normal; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">推荐阅读指数：★★★★★</span></p><p style="box-sizing: border-box; margin-top: 0px; margin-bottom: 15px; padding: 0px; line-height: 1.75em; text-align: justify; color: rgb(85, 85, 85); font-family: &quot;Microsoft Yahei&quot;, tahoma, Arial, Simsun; white-space: normal; widows: 1; background-color: rgb(255, 255, 255);"><span style="box-sizing: border-box; color: #FF0000;">注：建议大家到正版授权网站观看小说内容，支持原作者。为了保护版权，本站不提供免费阅读，只推荐小说名称和对作品的一些个人见解，仅供大家参考。</span></p>'
				var reg = new RegExp("[\\u4E00-\\u9FFF]+","g");
				// console.log(SaveData.section)
				// console.log(parseInt(SaveData.section) + '	%' + Model.length)
				// console.log(parseInt(SaveData.section)%(Model.length))
				// console.log(Model[parseInt(SaveData.section)%(Model.length)])
				var str1 = '{#ZC_BLOG_HOST#}'+(Model[parseInt(SaveData.section)%(Model.length)].Picture);
				var str2 = (Model[parseInt(SaveData.section)%(Model.length)].titlebefor) + SaveData.name + (Model[parseInt(SaveData.section)%(Model.length)].titleend);
				var str3 = SaveData.name+(Model[parseInt(SaveData.section)%(Model.length)].keyWord);
				if (reg.test(title) && reg.test(content)) {
					routeSql.zbp_post.create({
						log_CateID:1,
						log_AuthorID:novel_id,
						log_Tag:'{1}',
						log_Status:0,
						log_Type:0,
						log_Alias:SaveData.name,
						log_IsTop:0,
						log_IsLock:0,
						log_Title:Model[parseInt(SaveData.section)%(Model.length)].titlebefor + SaveData.name + Model[parseInt(SaveData.section)%(Model.length)].titleend,
						log_Intro:SaveData.Intro,
						log_Content:content,
						log_PostTime:(Date.parse(new Date())/1000),
						log_CommNums:0,
						log_ViewNums:1,
						log_Template:'',
						log_Meta:'a:4:{s:8:"thumburl";s:'+GetLength(str1)+':"{#ZC_BLOG_HOST#}'+Model[parseInt(SaveData.section)%(Model.length)].Picture+'";s:5:"title";s:'+GetLength(str2)+':"'+Model[parseInt(SaveData.section)%(Model.length)].titlebefor + SaveData.name + Model[parseInt(SaveData.section)%(Model.length)].titleend+'";s:8:"keywords";s:'+GetLength(str3)+':"'+SaveData.name+Model[parseInt(SaveData.section)%(Model.length)].keyWord+'";s:11:"description";s:'+GetLength(str2)+':"'+Model[parseInt(SaveData.section)%(Model.length)].titlebefor + SaveData.name + Model[parseInt(SaveData.section)%(Model.length)].titleend+'";}'
					}).then(function(){
						SaveData.section = SaveData.section + 1
						saveToMysql(SaveData,novel_id)
					})
				} else {
					getNewSheet(parseInt(novel_id) + 1)
				}
			}
		})
	}
}

function GetLength(str){
	var realLength = 0,len = str.length,charCode = -1;
	for(var i=0;i<len;i++){
		charCode = str.charCodeAt(i);
		if(charCode>0 && charCode<=128) realLength +=1;
		else realLength += 3;
	}
	return realLength;
}




