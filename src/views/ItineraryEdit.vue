<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">{{ isEdit ? '编辑行程' : '新建行程' }}</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="100px">
        <el-form-item label="天数" prop="day">
          <el-input-number v-model="form.day" :min="1" />
        </el-form-item>
        <el-form-item label="地点" prop="place">
          <el-input v-model="form.place" />
        </el-form-item>
        <el-form-item label="开始时间" prop="startTime">
          <el-time-picker v-model="form.startTime" placeholder="选择时间" value-format="HH:mm:ss" />
        </el-form-item>
        <el-form-item label="结束时间" prop="endTime">
          <el-time-picker v-model="form.endTime" placeholder="选择时间" value-format="HH:mm:ss" />
        </el-form-item>
        <el-form-item label="目的地" prop="destinationId">
          <el-select v-model="form.destinationId" placeholder="请选择目的地">
            <el-option v-for="d in destinations" :key="d.id" :label="d.name" :value="d.id" />
          </el-select>
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit" style="width:100%;">保存</el-button>
        </el-form-item>
      </el-form>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRoute, useRouter } from 'vue-router'
import request from '../api/request'
import { ElMessage } from 'element-plus'
import { getCurrentUser } from '../utils/user'
import { itineraryApi } from '../api/itinerary'

const route = useRoute()
const router = useRouter()
const user = getCurrentUser()
if (!user) {
  router.push('/login')
}
const isEdit = ref(!!route.params.id)
const formRef = ref()
const loading = ref(false)
const destinations = ref([])
const form = ref({
  id: null,
  userId: user ? user.id : null,
  destinationId: null,
  day: 1,
  place: '',
  startTime: '',
  endTime: ''
})

const rules = {
  day: [{ required: true, message: '天数不能为空', trigger: 'blur' }],
  place: [{ required: true, message: '地点不能为空', trigger: 'blur' }],
  destinationId: [{ required: true, message: '请选择目的地', trigger: 'change' }],
  startTime: [{ required: true, message: '请选择开始时间', trigger: 'change' }],
  endTime: [{ required: true, message: '请选择结束时间', trigger: 'change' }]
}

onMounted(async () => {
  if (!user) return
  const resDest = await request.get('/user/destination/list')
  if (resDest.code === 0) {
    destinations.value = resDest.list
  }
  if (isEdit.value) {
    const res = await itineraryApi.getItineraryById(route.params.id)
    if (res.code === 0) {
      Object.assign(form.value, res.itinerary)
    }
  }
})

const onSubmit = async () => {
  await formRef.value.validate()
  loading.value = true
  if (isEdit.value) {
    const res = await itineraryApi.updateItinerary(form.value)
    loading.value = false
    if (res.code === 0) {
      ElMessage.success('修改成功')
      router.push('/itinerary')
    } else {
      ElMessage.error(res.msg)
    }
  } else {
    const res = await itineraryApi.createItinerary(form.value)
    loading.value = false
    if (res.code === 0) {
      ElMessage.success('添加成功')
      router.push('/itinerary')
    } else {
      ElMessage.error(res.msg)
    }
  }
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