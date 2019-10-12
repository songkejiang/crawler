// var superagent = require('superagent');
// var charset = require('superagent-charset');
// charset(superagent);
var baseUrl = 'https://www.mzitu.com/'; //输入任何网址都可以
const cheerio = require('cheerio');
const rp = require("request-promise") //进入request-promise模块
const fs = require("fs")
let depositPath = "/Users/wanglina/Desktop/蒋松资料/crawler/imgs/"; //存放照片的地址
let downloadPath; //下载图片的文件夹地址
module.exports = {
    async getPage (url) {
        const data = {
            url,
            res: await rp({
                url:url
            })
        }
        return data
    },
    getUrl(data) {
        let list = [];
        const $ = cheerio.load(data.res)
        $("#pins li a")
        .children()
        .each(async (i,e) => {
            let obj = {
                name: e.attribs.alt,
                url: e.parent.attribs.href
            }
            list.push(obj)
        })
        return list
    },
    getTitle(obj) {
        downloadPath = depositPath + obj.name
        if (!fs.existsSync(downloadPath)) { //查看是否存在这个文件夹
            fs.mkdirSync(downloadPath);//不存在就建文件夹
            // console.log(`${obj.name}文件夹创建成功`);
            return true
        } else {
            // console.log(`${obj.name}文件夹已经存在`);
            return false;
        }
    },
    getImagesNum(res,name) {
        if (res) {
            let $ = cheerio.load(res)
            let len = $(".pagenavi")
            .find("a")
            .find("span").length;
            if (len == 0) {
                fs.rmdirSync(`${depositPath}${name}`);//删除无法下载的文件夹
                return 0;
            }
            let pageIndex = $(".pagenavi")
            .find("a")
            .find("span")[len - 2].children[0].data;
            return pageIndex;//返回图片总数
        }
    },
    async downLoadImage(data, index) {
        if (data.res) {
            let $ = cheerio.load(data.res)
            if ($(".main-image").find("img")[0]) {
                let imgSrc = $(".main-image").find("img")[0].attribs.src;//图片地址
                console.log(imgSrc)
                let headers = {
                    Accept: "text/html,application/xhtml+xml,application/xml;q=0.9,image/webp,image/apng,*/*;q=0.8",
                    "Accept-Encoding": "gzip, deflate",
                    "Accept-Language": "zh-CN,zh;q=0.9,en;q=0.8",
                    "Cache-Control": "no-cache",
                    Host: "i5.meizitu.net",
                    Pragma: "no-cache",
                    "Proxy-Connection": "keep-alive",
                    Referer: data.url,
                    "Upgrade-Insecure-Requests": 1,
                    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/65.0.3325.19 Safari/537.36"
                  };//反防盗链
                  await rp({
                    url: imgSrc,
                    resolveWithFullResponse: true,
                    headers
                  }).pipe(fs.createWriteStream(`${downloadPath}/${index}.jpg`));//下载
                //   console.log(`${downloadPath}/${index}.jpg下载成功`);
            } else {
                console.log(`${downloadPath}/${index}.jpg加载失败`);
            }
        }
    }
}



// let getPage = async (URL) => {
//   return await rp({
//     url: URL
//    })  //这样，我们返回了一个对象，就是这个页面的url和页面内容。
// }

// getPage(baseUrl).then((res) => {
//   const $ = cheerio.load(res); //将html转换为可操作的节点
//   // console.log(res)
//   $('img').each(async (index, item) => {
//     // console.log($(item).attr('data-original'))
//     try{
//       let res = await rp({
//         resolveWithFullResponse: true,
//         url: $(item).attr('data-original')
//       }).pipe(fs.createWriteStream(`/Users/wanglina/Desktop/蒋松资料/crawler/imgs/${index}.jpg`))
//       console.log('---==', res)
//     } catch(e) {
//       console.log('---', e)
//     }
//   })
// })
// // app.get('/index', function(req, res) {
// //     //设置请求头
// //     // res.header("Access-Control-Allow-Origin", "*");
// //     // res.header('Access-Control-Allow-Methods', 'PUT, GET, POST, DELETE, OPTIONS');
// //     // res.header("Access-Control-Allow-Headers", "X-Requested-With");
// //     // res.header('Access-Control-Allow-Headers', 'Content-Type');
// //     //类型
// //     var type = req.query.type;
// //     //页码
// //     var page = req.query.page;
// //     type = type || 'weixin';
// //     page = page || '1';
// //     var route = `tx/${type}tx_${page}.html`
// //     console.log(page)
// //     //网页页面信息是gb2312，所以chaeset应该为.charset('gb2312')，一般网页则为utf-8,可以直接使用.charset('utf-8')
// //     superagent.get(baseUrl)
// //         .charset('utf-8')
// //         .end(function(err, sres) {
// //           console.log(sres.text)
// //             var items = [];
// //             if (err) {
// //                 res.json({ code: 400, msg: err, sets: items });
// //                 return;
// //             }
// //             var $ = cheerio.load(sres.text);
// //             $('div.g-main-bg ul.g-gxlist-imgbox li a').each(function(idx, element) {
// //                 var $element = $(element);
// //                 var $subElement = $element.find('img');
// //                 var thumbImgSrc = $subElement.attr('src');
// //                 items.push({
// //                     title: $(element).attr('title'),
// //                     href: $element.attr('href'),
// //                     thumbSrc: thumbImgSrc
// //                 });
// //             });
// //             // res.json({ code: 200, msg: "", data: items });
// //             res.end(sres.text)
// //         });
// // });
// var server = app.listen(8888, function() {

//     var host = server.address().address
//     var port = server.address().port

//     console.log("应用实例，访问地址为 http://%s:%s", host, port)

// })