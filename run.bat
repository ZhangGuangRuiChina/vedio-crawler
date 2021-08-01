:: 注释符::
:: 如果需要展示cmd弹窗则添加cmd /k
:: 如果需要执行多条命令则用&&分隔每一条命令
:: 如果需要打开指定路径则用"cd /d I:\A\B\C"
:: cmd /k "cd /d I:\A\B\C&&ffmpeg -allowed_extensions ALL -i index.m3u8 -c copy -bsf:a aac_adtstoasc dachangtui.mp4&&del /f /s /q *.m3u8&&del /f /s /q *.key&&del /f /s /q *.ts"
:: 以上命令的意思为：打开I盘C目录下的cmd弹窗，并执行ffmpeg命令（以index.m3u8文件解码、合并ts文件，并输出为dachangtui.mp4视频文件），再删除当前目录下的所有.m3u8/.key/.ts文件

cmd /k "ffmpeg -allowed_extensions ALL -i index.m3u8 -c copy -bsf:a aac_adtstoasc XXXX.mp4&&del /f /s /q *.m3u8&&del /f /s /q *.key&&del /f /s /q *.ts"

:: ffmpeg -f concat -i index.txt -c copy all.mp4
:: 以上命令的意思为：合并index.txt中所有视频片段，并转成mp4格式
:: index.txt内容为(1.image等视频片段需要在同路径下)：
:: file '1.image'
:: file '2.image'
:: ....
:: file '666.image'