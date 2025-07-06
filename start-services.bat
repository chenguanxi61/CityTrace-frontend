@echo off
echo 正在启动旅游推荐系统服务...

echo 启动后端服务...
start "后端服务" cmd /k "cd back && mvn spring-boot:run"

echo 等待后端服务启动...
timeout /t 10 /nobreak

echo 启动前端服务...
start "前端服务" cmd /k "cd front && npm run serve"

echo 服务启动完成！
echo 前端访问地址: http://192.168.43.6:8081
echo 后端API地址: http://192.168.43.6:8080/lvyoutuijianxitong
pause 