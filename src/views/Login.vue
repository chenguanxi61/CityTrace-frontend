<template>
  <div class="center-card">
    <el-card class="form-card">
      <h2 class="form-title">用户登录</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" status-icon>
        <el-form-item label="用户名/邮箱" prop="usernameOrEmail">
          <el-input v-model="form.usernameOrEmail" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item>
          <el-button type="primary" :loading="loading" @click="onSubmit" style="width:100%;">登录</el-button>
        </el-form-item>
      </el-form>
      <div class="form-tip">
        没有账号？<a @click="goRegister">去注册</a>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import request from '../api/request'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form = ref({
  usernameOrEmail: '',
  password: ''
})
const rules = {
  usernameOrEmail: [ { required: true, message: '请输入用户名或邮箱', trigger: 'blur' } ],
  password: [ { required: true, message: '请输入密码', trigger: 'blur' } ]
}
const goRegister = () => router.push('/register')
const onSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      const res = await request.post('/user/login', form.value)
      if (res.code === 0) {
        ElMessage.success('登录成功')
        localStorage.setItem('user', JSON.stringify(res.user))
        router.push('/profile')
      } else {
        ElMessage.error(res.msg)
      }
    } catch (e) {
      ElMessage.error('登录失败')
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
.form-tip a {
  color: #409eff;
  cursor: pointer;
  text-decoration: underline;
}
</style> 