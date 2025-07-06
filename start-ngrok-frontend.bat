@echo off
echo 启动 ngrok 穿透前端服务 (端口8081)...
echo.
echo 注意：首次使用需要注册 ngrok 账号并获取 authtoken
echo 注册地址：https://ngrok.com/
echo.
ngrok http 8081
pause 