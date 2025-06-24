<template>
  <div class="center-card">
    <el-card v-if="user">
      <h2 class="form-title">我的行程</h2>
      <el-button type="primary" @click="addItinerary" style="margin-bottom: 20px;">新建行程</el-button>
      <el-table v-if="!loading && list.length" :data="list" style="width: 100%;">
        <el-table-column prop="day" label="天数" width="60" />
        <el-table-column prop="place" label="地点" />
        <el-table-column prop="startTime" label="开始时间" />
        <el-table-column prop="endTime" label="结束时间" />
        <el-table-column label="操作" width="220">
          <template #default="scope">
            <el-button size="small" @click="viewDetail(scope.row.id)">详情</el-button>
            <el-button size="small" @click="editItinerary(scope.row.id)">编辑</el-button>
            <el-button size="small" type="danger" @click="deleteItinerary(scope.row.id)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <el-empty v-else-if="!loading && !list.length" description="暂无行程" />
      <div v-if="loading" style="text-align:center;padding:40px 0;">
        <el-icon><i class="el-icon-loading"></i></el-icon> 加载中...
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useRouter } from 'vue-router'
import request from '../api/request'
import { ElMessage, ElMessageBox } from 'element-plus'
import { getCurrentUser } from '../utils/user'

const router = useRouter()
const user = getCurrentUser()
const list = ref([])
const loading = ref(false)

const loadList = async () => {
  if (!user) return
  loading.value = true
  try {
    const res = await request.get('/user/itinerary/list', { params: { userId: user.id } })
    if (res.code === 0) {
      list.value = res.list
    }
  } catch (e) {
    ElMessage.error('加载失败')
  }
  loading.value = false
}

onMounted(loadList)

const viewDetail = (id) => {
  router.push(`/itinerary/${id}`)
}
const editItinerary = (id) => {
  router.push(`/itinerary/edit/${id}`)
}
const addItinerary = () => {
  router.push('/itinerary/edit')
}
const deleteItinerary = (id) => {
  ElMessageBox.confirm('确定要删除该行程吗？', '提示', { type: 'warning' })
    .then(async () => {
      try {
        const res = await request.delete(`/user/itinerary/${id}`)
        if (res.code === 0) {
          ElMessage.success('删除成功')
          loadList()
        } else {
          ElMessage.error(res.msg)
        }
      } catch (e) {
        ElMessage.error('删除失败')
      }
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
</style> 