var superagent = require('superagent');
var charset = require('superagent-charset');
charset(superagent);
var express = require('express');
var baseUrl = 'https://new.qq.com/ch/photo/?fromdefault'; //输入任何网址都可以
const cheerio = require('cheerio');
var app = express();
const rp = require("request-promise") //进入request-promise模块
const fs = require("fs")
let getPage = async (URL) => {
  return await rp({
    url: URL
   })  //这样，我们返回了一个对象，就是这个页面的url和页面内容。
}

getPage(baseUrl).then((res) => {
  const $ = cheerio.load(res); //将html转换为可操作的节点
  // console.log(res)
  $('img').each(async (index, item) => {
    console.log($(item).attr('src'))
    // let res = await rp({
    //   resolveWithFullResponse: true,
    //   url: $(item).attr('data-original')
    // })
    // console.log('====', res)
  })
})
// app.get('/index', function(req, res) {
//     //设置请求头
//     // res.header("Access-Control-Allow-Origin", "*");
//     // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
//     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
//     // res.header('Access-Control-Allow-Headers', 'Content-Type');
//     //类型
//     var type = req.query.type;
//     //页码
//     var page = req.query.page;
//     type = type || 'weixin';
//     page = page || '1';
//     var route = `tx/${type}tx_${page}.html`
//     console.log(page)
//     //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
//     superagent.get(baseUrl)
//         .charset('utf-8')
//         .end(function(err, sres) {
//           console.log(sres.text)
//             var items = [];
//             if (err) {
//                 res.json({ code: 400, msg: err, sets: items });
//                 return;
//             }
//             var $ = cheerio.load(sres.text);
//             $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function(idx, element) {
//                 var $element = $(element);
//                 var $subElement = $element.find('img');
//                 var thumbImgSrc = $subElement.attr('src');
//                 items.push({
//                     title: $(element).attr('title'),
//                     href: $element.attr('href'),
//                     thumbSrc: thumbImgSrc
//                 });
//             });
//             // res.json({ code: 200, msg: "", data: items });
//             res.end(sres.text)
//         });
// });
var server = app.listen(8888, function() {

    var host = server.address().address
    var port = server.address().port

    console.log("应用实例，访问地址为 http://%s:%s", host, port)

})