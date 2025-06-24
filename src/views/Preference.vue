<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">用户偏好设置</h2>
      <el-form :model="form" label-width="100px">
        <el-form-item label="喜欢自然">
          <el-switch v-model="form.prefersNature" />
        </el-form-item>
        <el-form-item label="喜欢文化">
          <el-switch v-model="form.prefersCulture" />
        </el-form-item>
        <el-form-item label="喜欢美食">
          <el-switch v-model="form.prefersFood" />
        </el-form-item>
        <el-form-item label="预算">
          <el-input-number v-model="form.budget" :min="0" />
        </el-form-item>
        <el-form-item label="旅行天数">
          <el-input-number v-model="form.travelDays" :min="1" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" @click="onSubmit" style="width:100%;">保存偏好</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../api/request'
import { ElMessage } from 'element-plus'
import { getCurrentUser } from '../utils/user'

const router = useRouter()
const user = getCurrentUser()
if (!user) {
  router.push('/login')
}
const form = ref({
  userId: user ? user.id : null,
  prefersNature: false,
  prefersCulture: false,
  prefersFood: false,
  budget: 0,
  travelDays: 1
})

onMounted(async () => {
  if (!user) return
  const res = await request.get('/user/preference', { params: { userId: form.value.userId } })
  if (res.code === 0) {
    Object.assign(form.value, res.preference)
  }
})

const onSubmit = async () => {
  const res = await request.put('/user/preference', form.value)
  if (res.code === 0) {
    ElMessage.success('保存成功')
  } else {
    ElMessage.error(res.msg)
  }
}
</script>

<style scoped>
.center-card {
  display: flex;
  justify-content: center;
  align-items: center;
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