<template>
  <div class="center-card">
    <el-card class="form-card" v-if="user">
      <h2 class="form-title">个人信息</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" disabled />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" disabled />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender">
            <el-option label="男" value="男" />
            <el-option label="女" value="女" />
          </el-select>
        </el-form-item>
        <el-form-item label="生日" prop="birthday">
          <el-date-picker v-model="form.birthday" type="date" value-format="YYYY-MM-DD" />
        </el-form-item>
        <el-form-item label="语言" prop="language">
          <el-input v-model="form.language" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit" style="width:100%;">保存修改</el-button>
        </el-form-item>
      </el-form>
      <div class="form-tip">
        如需修改用户名/邮箱请联系管理员
      </div>
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
const formRef = ref()
const loading = ref(false)
const form = ref({
  id: user ? user.id : null,
  username: '',
  email: '',
  gender: '',
  birthday: '',
  language: ''
})
const rules = {
  gender: [ { required: true, message: '请选择性别', trigger: 'change' } ],
  birthday: [ { required: true, message: '请选择生日', trigger: 'change' } ],
  language: [ { required: true, message: '请输入语言', trigger: 'blur' } ]
}
onMounted(async () => {
  if (!user) return
  const res = await request.get('/user/profile', { params: { id: form.value.id } })
  if (res.code === 0) {
    Object.assign(form.value, res.user)
  }
})
const onSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      const res = await request.put('/user/profile', form.value)
      if (res.code === 0) {
        ElMessage.success('修改成功')
      } else {
        ElMessage.error(res.msg)
      }
    } catch (e) {
      ElMessage.error('保存失败')
    } finally {
      loading.value = false
    }
  })
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
.form-card {
  width: 370px;
  max-width: 95vw;
  margin: 0 auto;
}
.form-title {
  text-align: center;
  margin-bottom: 20px;
  color: #409eff;
  font-weight: bold;
  font-size: 24px;
}
.form-tip {
  text-align: center;
  margin-top: 12px;
  color: #888;
  font-size: 14px;
}
</style> 