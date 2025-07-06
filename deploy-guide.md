# 云服务器部署指南

## 1. 购买云服务器
- 阿里云、腾讯云、华为云等
- 建议配置：2核4G内存，带宽5M以上

## 2. 环境准备
```bash
# 安装Java 8+
sudo apt update
sudo apt install openjdk-8-jdk

# 安装Node.js
curl -fsSL https://deb.nodesource.com/setup_16.x | sudo -E bash -
sudo apt-get install -y nodejs

# 安装MySQL
sudo apt install mysql-server
```

## 3. 部署步骤
1. 上传项目文件到服务器
2. 配置数据库
3. 修改application.yml中的数据库连接
4. 启动后端服务
5. 构建并启动前端服务

## 4. 域名配置
- 购买域名
- 配置DNS解析到服务器IP
- 配置Nginx反向代理

## 5. 访问地址
- 前端：http://your-domain.com
- 后端：http://your-domain.com/api 