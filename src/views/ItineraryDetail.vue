<template>
  <div class="center-card">
    <el-card v-if="user && detail">
      <h2 class="form-title">行程详情</h2>
      <el-descriptions :column="1" border>
        <el-descriptions-item label="天数">{{ detail.day }}</el-descriptions-item>
        <el-descriptions-item label="地点">{{ detail.place }}</el-descriptions-item>
        <el-descriptions-item label="开始时间">{{ detail.startTime }}</el-descriptions-item>
        <el-descriptions-item label="结束时间">{{ detail.endTime }}</el-descriptions-item>
        <el-descriptions-item label="目的地ID">{{ detail.destinationId }}</el-descriptions-item>
      </el-descriptions>
      <el-button type="primary" style="margin-top:20px;" @click="goBack">返回</el-button>
    </el-card>
    <el-empty v-else-if="user" description="未找到行程" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '../api/request'
import { getCurrentUser } from '../utils/user'

const detail = ref(null)
const route = useRoute()
const router = useRouter()
const user = getCurrentUser()
if (!user) {
  router.push('/login')
}

onMounted(async () => {
  if (!user) return
  const res = await request.get(`/user/itinerary/${route.params.id}`)
  if (res.code === 0) {
    detail.value = res.itinerary
  }
})

const goBack = () => {
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
</style> 