<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">系统设置</h2>
      
      <el-form :model="settings" label-width="120px" class="settings-form">
        <el-form-item label="语言设置">
          <el-select v-model="settings.language" placeholder="选择语言">
            <el-option label="简体中文" value="zh-CN" />
            <el-option label="English" value="en-US" />
            <el-option label="日本語" value="ja-JP" />
          </el-select>
        </el-form-item>
        
        <el-form-item label="主题设置">
          <el-radio-group v-model="settings.theme">
            <el-radio label="light">浅色主题</el-radio>
            <el-radio label="dark">深色主题</el-radio>
            <el-radio label="auto">跟随系统</el-radio>
          </el-radio-group>
        </el-form-item>
        
        <el-form-item label="通知设置">
          <el-switch v-model="settings.notifications" />
          <span style="margin-left: 8px; color: #909399;">接收推送通知</span>
        </el-form-item>
        
        <el-form-item label="位置权限">
          <el-switch v-model="settings.locationPermission" />
          <span style="margin-left: 8px; color: #909399;">允许获取位置信息</span>
        </el-form-item>
        
        <el-form-item label="数据同步">
          <el-switch v-model="settings.autoSync" />
          <span style="margin-left: 8px; color: #909399;">自动同步数据</span>
        </el-form-item>
        
        <el-form-item label="隐私设置">
          <el-checkbox v-model="settings.shareLocation">允许分享位置</el-checkbox>
          <el-checkbox v-model="settings.shareItinerary">允许分享行程</el-checkbox>
        </el-form-item>
        
        <el-form-item>
          <el-button type="primary" @click="saveSettings" :loading="saving">保存设置</el-button>
          <el-button @click="resetSettings">重置默认</el-button>
        </el-form-item>
      </el-form>
      
      <el-divider />
      
      <div class="danger-zone">
        <h3>危险操作</h3>
        <el-button type="danger" @click="clearData">清除所有数据</el-button>
        <el-button type="danger" @click="deleteAccount">删除账户</el-button>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentUser } from '../utils/user'

const user = getCurrentUser()
const saving = ref(false)

const settings = ref({
  language: 'zh-CN',
  theme: 'light',
  notifications: true,
  locationPermission: true,
  autoSync: true,
  shareLocation: false,
  shareItinerary: true
})

const saveSettings = async () => {
  saving.value = true
  try {
    // 这里应该调用保存设置的 API
    await new Promise(resolve => setTimeout(resolve, 1000)) // 模拟 API 调用
    ElMessage.success('设置保存成功')
  } catch (error) {
    ElMessage.error('保存失败')
  }
  saving.value = false
}

const resetSettings = () => {
  ElMessageBox.confirm('确定要重置所有设置吗？', '提示', { type: 'warning' })
    .then(() => {
      settings.value = {
        language: 'zh-CN',
        theme: 'light',
        notifications: true,
        locationPermission: true,
        autoSync: true,
        shareLocation: false,
        shareItinerary: true
      }
      ElMessage.success('设置已重置')
    })
}

const clearData = () => {
  ElMessageBox.confirm('此操作将清除所有本地数据，确定继续吗？', '警告', { 
    type: 'warning',
    confirmButtonText: '确定清除',
    cancelButtonText: '取消'
  })
    .then(() => {
      ElMessage.info('数据清除功能开发中...')
    })
}

const deleteAccount = () => {
  ElMessageBox.confirm('此操作将永久删除您的账户，确定继续吗？', '危险操作', { 
    type: 'error',
    confirmButtonText: '确定删除',
    cancelButtonText: '取消'
  })
    .then(() => {
      ElMessage.info('账户删除功能开发中...')
    })
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

.settings-form {
  max-width: 500px;
  margin: 0 auto;
}

.danger-zone {
  text-align: center;
  padding: 20px;
  background: #fef0f0;
  border-radius: 8px;
  margin-top: 20px;
}

.danger-zone h3 {
  color: #f56c6c;
  margin-bottom: 16px;
}

.danger-zone .el-button {
  margin: 0 8px;
}
</style> 