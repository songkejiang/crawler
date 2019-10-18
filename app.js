const express = require('express')
var app = express();
const model = require("./model"),
  basicPath = "http://www.mzitu.com/";
let start = 1,
  end = 10;

  const main = async url  => {
    let list = [],
    index = 0;
    const data = await model.getPage(url);
    list = model.getUrl(data);
    downLoadImages(list, index);//下载
  }

  const downLoadImages = async (list, index) => {
    if (index == list.length) {
      start++;
      if (start < end) {
        main(basicPath + start);//进行下一页图片组的爬取。
      }
      return false;
    }
    if (model.getTitle(list[index])) {
      let item = await model.getPage(list[index].url),//获取图片所在网页的url
        imageNum = model.getImagesNum(item.res,list[index].name);//获取这组图片的数量
      for (var i = 1; i <= imageNum; i++) {
        let url
        if(i==1) {
          url = list[index].url
        } else {
          url = list[index].url + `/${i}`
        }
        try {
          console.log(url)
          let page = await model.getPage(url);//遍历获取这组图片每一张所在的网页
          await model.downLoadImage(page, i);//下载
        } catch(e) {
          console.log(e)
        }
      }
      index++;
      downLoadImages(list, index);//循环完成下载下一组
    } else {
      index++;
      downLoadImages(list, index);//下载下一组
    }
  }
  main(basicPath);
//   app.get('/index', function(req, res) {

//   })
//   var server = app.listen(8888, function() {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })