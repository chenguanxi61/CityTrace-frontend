@echo off
echo 正在设置内网穿透工具 ngrok...

REM 下载 ngrok
echo 下载 ngrok...
powershell -Command "Invoke-WebRequest -Uri 'https://bin.equinox.io/c/bNyj1mQVY4c/ngrok-v3-stable-windows-amd64.zip' -OutFile 'ngrok.zip'"

REM 解压
echo 解压 ngrok...
powershell -Command "Expand-Archive -Path 'ngrok.zip' -DestinationPath '.' -Force"

REM 删除压缩包
del ngrok.zip

echo ngrok 设置完成！
echo.
echo 使用方法：
echo 1. 启动后端服务
echo 2. 启动前端服务  
echo 3. 运行 ngrok http 8081 来穿透前端
echo 4. 运行 ngrok http 8080 来穿透后端
echo.
pause 