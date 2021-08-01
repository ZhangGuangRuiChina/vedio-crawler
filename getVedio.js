const request = require('request');
const fs = require('fs');

// 正则匹配公共前缀url
const REGEX = /\http.*?\mp4/;
// 正则匹配ts文件个数
const MAX_REGEX = /(?<=\-)\d*?(?=\-)/g;
// 请求ts个数，index.m3u8请求时会确认这个值的大小
let i = 1;
let MAX = 10000;
// m3u8/key/ts请求链接的公共部分httpXXXXXXXXmp4
let startUrl = '';

function download (url) {
  // 确认每次请求应该输出什么名字和格式，
  const outputFileName = url.split('/').pop().split('?')[0];
  const options = {
    // m3u8Url: `https://XXXXXXXX-de6c9ec1644b6a86c0e12c094765db.mp4/index.m3u8?type=2`,
    // keyURL: `https://XXXXXXXX-de6c9ec1644b6a86c0e12c094765db.mp4/encryption.key`,
    // tsURL: `https://XXXXXXXX-de6c9ec1644b6a86c0e12c094765db.mp4/seg-1-v1-a1.ts`,
    // tsURL: `https://XXXXXXXX-de6c9ec1644b6a86c0e12c094765db.mp4/seg-2-v1-a1.ts`,
    // ...
    // tsURL: `https://XXXXXXXX-de6c9ec1644b6a86c0e12c094765db.mp4/seg-${MAX}-v1-a1.ts`,
    url: url,
    headers: {
      'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.114 Safari/537.36'
    }
  }
  
  request(options,(error,response,body) => {
    if (url.includes('index.m3u8')) {
      // // m3u8文件里有所有ts视频文件，只需要找到最大值MAX即可
      MAX = body.match(MAX_REGEX).pop()*1;
      startUrl = url.match(REGEX)[0];
      // // 重新组装请求key文件的url
      const keyUrl = startUrl + `/encryption.key`;
      download(keyUrl);

    } else if (url.includes('encryption.key')) {
      let timer = setInterval(() => {
        if (i > MAX) {
          clearInterval(timer);
          return console.log('爬取数据完成');
        } else {
          let tsUrl = `${startUrl}/seg-${i}-v1-a1.ts`;
          download(tsUrl);
          i++
        }
      }, 500);
    }
  // pipe下载每次请求返回来的文件
  }).pipe(fs.createWriteStream(`./vedio/${outputFileName}`));
}
/**
 * download这个function做的事情：
      1、先请求/index.m3u8?type=2，得到index.m3u8文件，且再此处确认ts文件的数量和切割出公共前缀url
      2、递归请求/encryption.key，得到encryption.key文件，再次进入最后请求ts文件的递归
      3、遍历1-MAX去递归请求ts文件，每次请求ts文件设置200ms的间隔
 * 
 * 即只需要调用一次目标路径/index.m3u8?type=2即可完成所有文件的自动下载。下载完后请移步到./vedio/run.bat中查看视频的解密步骤
 */
download('https://XXXXXX/video/20210624/0fb733a67414cc949708f5d5dd8bc031_bb7c4e9eed3b4b34a0aed1de1300a93c.mp4/index.m3u8?type=2');