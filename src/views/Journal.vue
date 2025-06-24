<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">旅行日志</h2>
      <el-button type="primary" @click="addJournal" style="margin-bottom: 20px;">写日志</el-button>
      
      <el-empty v-if="!loading && !journals.length" description="暂无日志" />
      <div v-if="loading" style="text-align:center;padding:40px 0;">
        <el-icon><i class="el-icon-loading"></i></el-icon> 加载中...
      </div>
      
      <div v-if="!loading && journals.length" class="journal-list">
        <el-card v-for="journal in journals" :key="journal.id" class="journal-item" shadow="hover">
          <div class="journal-header">
            <h3>{{ journal.title }}</h3>
            <span class="journal-date">{{ journal.createTime }}</span>
          </div>
          <p class="journal-content">{{ journal.content }}</p>
          <div class="journal-footer">
            <el-button size="small" @click="viewJournal(journal.id)">查看详情</el-button>
            <el-button size="small" @click="editJournal(journal.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteJournal(journal.id)">删除</el-button>
          </div>
        </el-card>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { getCurrentUser } from '../utils/user'

const router = useRouter()
const user = getCurrentUser()
const journals = ref([])
const loading = ref(false)

const loadJournals = async () => {
  if (!user) return
  loading.value = true
  try {
    // 这里需要调用日志相关的 API
    // const res = await journalApi.getUserJournals(user.id)
    // if (res.code === 0) {
    //   journals.value = res.list
    // }
    
    // 临时模拟数据
    journals.value = [
      {
        id: 1,
        title: '北京之旅第一天',
        content: '今天去了故宫，感受到了历史的厚重...',
        createTime: '2024-01-15'
      }
    ]
  } catch (e) {
    ElMessage.error('加载失败')
  }
  loading.value = false
}

onMounted(loadJournals)

const addJournal = () => {
  ElMessage.info('日志功能开发中...')
}

const viewJournal = (id) => {
  ElMessage.info('日志详情功能开发中...')
}

const editJournal = (id) => {
  ElMessage.info('日志编辑功能开发中...')
}

const deleteJournal = (id) => {
  ElMessage.info('日志删除功能开发中...')
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

.journal-list {
  display: flex;
  flex-direction: column;
  gap: 16px;
}

.journal-item {
  margin-bottom: 16px;
}

.journal-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.journal-header h3 {
  margin: 0;
  color: #303133;
}

.journal-date {
  color: #909399;
  font-size: 14px;
}

.journal-content {
  color: #606266;
  line-height: 1.6;
  margin-bottom: 16px;
}

.journal-footer {
  display: flex;
  gap: 8px;
}
</style> 