<template>
  <div class="center-card">
    <el-card>
      <h2 class="form-title">目的地列表</h2>
      <el-table :data="list" style="width: 100%;">
        <el-table-column prop="name" label="名称" />
        <el-table-column prop="type" label="类型" />
        <el-table-column prop="description" label="简介" />
        <el-table-column label="操作">
          <template #default="scope">
            <el-button type="primary" @click="viewDetail(scope.row.id)">详情</el-button>
          </template>
        </el-table-column>
      </el-table>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import axios from 'axios'
import { useRouter } from 'vue-router'

const list = ref([])
const router = useRouter()

onMounted(async () => {
  const res = await axios.get('/api/user/destination/list')
  if (res.data.code === 0) {
    list.value = res.data.list
  }
})

const viewDetail = (id) => {
  router.push(`/destination/${id}`)
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