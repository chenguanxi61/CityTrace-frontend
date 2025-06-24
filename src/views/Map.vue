<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">地图导航</h2>
      
      <div class="map-container">
        <div class="map-placeholder">
          <el-icon size="64" color="#409eff">
            <Location />
          </el-icon>
          <h3>地图功能开发中...</h3>
          <p>这里将集成地图服务，提供以下功能：</p>
          <ul>
            <li>📍 目的地定位和导航</li>
            <li>🗺️ 行程路线规划</li>
            <li>🏨 附近酒店、餐厅推荐</li>
            <li>🚇 公共交通信息</li>
            <li>📍 实时位置分享</li>
          </ul>
        </div>
      </div>
      
      <div class="map-controls">
        <el-button type="primary" @click="showMapFeatures">查看功能预览</el-button>
        <el-button @click="goToItinerary">查看我的行程</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { Location } from '@element-plus/icons-vue'
import { getCurrentUser } from '../utils/user'

const router = useRouter()
const user = getCurrentUser()

const showMapFeatures = () => {
  ElMessage.info('地图功能即将上线，敬请期待！')
}

const goToItinerary = () => {
  router.push('/itinerary')
}
</script>

<style scoped>
.center-card {
  display: flex;
  justify-content: center;
  align-items: flex-start;
  min-height: 80vh;
  background: #f5f7fa;
}

.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
}

.map-container {
  min-height: 400px;
  display: flex;
  align-items: center;
  justify-content: center;
  background: #fafafa;
  border-radius: 8px;
  margin-bottom: 20px;
}

.map-placeholder {
  text-align: center;
  padding: 40px;
}

.map-placeholder h3 {
  margin: 16px 0;
  color: #409eff;
}

.map-placeholder p {
  color: #606266;
  margin-bottom: 16px;
}

.map-placeholder ul {
  text-align: left;
  display: inline-block;
  color: #606266;
}

.map-placeholder li {
  margin: 8px 0;
}

.map-controls {
  display: flex;
  justify-content: center;
  gap: 16px;
}
</style> 