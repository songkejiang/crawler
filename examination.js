// const express = require('express')
// var app = express();
const cheerio = require('cheerio');
const model = require("./model"),
  basicPath = "http://www.zuowen.com/gaokaozw/lngkmf/#qgOne";

  const main = async url  => {
    let list = [],
    index = 0;
    const data = await model.getPage(url);
    let $ = cheerio.load(data.res)
    $('.box1').each((index, item) => {
      // let box1_1 = $(item).find('.box1_1')
      // console.log($(item).find('a').attr('href'))
      console.log(index)
      $(item).find('.box1_1').each((inerIndes, innerItem) => {
        $(innerItem).find('a').each((i, d) => {
          console.log($(d).attr('href'))
          console.log($(d).text())
        })
      })
    })
    // $('.quanguo .boxCon .box1_1').children().each((index, item) => {
    //   // let box1_1 = $(item).find('.box1_1')
    //   console.log($(item).find('a').attr('href'))
    //   console.log($(item).children().text())
    //   console.log(index)
    // })
    // list = model.getUrl(data);
    // downLoadImages(list, index);//下载
  }
  main(basicPath);