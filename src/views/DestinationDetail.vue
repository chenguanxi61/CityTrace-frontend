<template>
  <div class="center-card">
    <el-card v-if="detail">
      <h2 class="form-title">{{ detail.name }}</h2>
      <p><b>类型：</b>{{ detail.type }}</p>
      <p><b>简介：</b>{{ detail.description }}</p>
      <p><b>经度：</b>{{ detail.lng }}</p>
      <p><b>纬度：</b>{{ detail.lat }}</p>
    </el-card>
    <el-empty v-else description="未找到目的地" />
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRoute } from 'vue-router'
ww
const detail = ref(null)
const route = useRoute()

onMounted(async () => {
  const res = await axios.get(`/api/user/destination/${route.params.id}`)
  if (res.data.code === 0) {
    detail.value = res.data.destination
  }
})
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