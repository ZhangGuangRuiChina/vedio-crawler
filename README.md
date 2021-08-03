# 视频爬虫
 
## 快速开始
```bash
# 安装依赖
npm install request fs --save

# 更改getVedio.js中download方法的链接
download('https://XXXXXX.mp4/index.m3u8?type=2');

# 终端启动
node getVedio

```

## 简介

- 该项目是基于request、fs模块的视频爬虫教程。代码量十分简短，主要提供一种爬取、解密、合并视频（基于AES-128加密）的思路。

## 技术要点

- 基于js的request、fs模块

- 基于ffmpeg的视频解密、合并命令

- 其他一些bat的命令语法

## 爬取流程

### 1.控制台查看视频信息

- 每条完整视频包括一份.m3u8、一份.key、N份ts视频文件
![avatar](/img/vedioInfo_m3u8.png)

- 查看服务端返回的.m3u8文件，这份文件描述了这条视频的完整信息：

  - AES-128为加密方式
  - encryption.key为解密文件
  - seg-XX-v1-a1.ts为加密后的视频片段

- 可以发现同一条视频中所有.m3u8、.key、.ts链接的前缀都是一样的，所以只需要一份.m3u8即可爬取所有视频信息



### 2.爬取视频中的所有信息文件

- 具体请看getVedio.js中的代码

- node getVedio执行自动化爬取


### 3. 双击run.bat执行解密、合并视频（vedio文件夹内需要放置ffmpeg.exe文件，请自行下载）

- 这里需要用到ffmpeg.exe以及相关的命令，具体教程请自行搜索学习。合并命令：

  - ffmpeg -allowed_extensions ALL -i index.m3u8 -c copy -bsf:a aac_adtstoasc XXX.mp4


- 为了提高效率，本人简单地学习并写了一份bat文件去自动化执行解密、合并操作。bat文件代码（文件有注解）：

  - cmd /k "ffmpeg -allowed_extensions ALL -i index.m3u8 -c copy -bsf:a aac_adtstoasc XXXX.mp4&&del /f /s /q *.m3u8&&del /f /s /q *.key&&del /f /s /q *.ts"


## 总结

- 这里提供爬取加密过的视频思路，如果其他网站的视频未加密或形式更简单，则可以调整getVedio.js中的代码内容。

- 请大家尊重版权，请勿使用技术进行违法的勾当

- 注意身体
