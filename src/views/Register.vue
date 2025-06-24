<template>
  <div class="center-card">
    <el-card class="form-card">
      <h2 class="form-title">用户注册</h2>
      <el-form :model="form" :rules="rules" ref="formRef" label-width="80px" status-icon>
        <el-form-item label="用户名" prop="username">
          <el-input v-model="form.username" />
        </el-form-item>
        <el-form-item label="邮箱" prop="email">
          <el-input v-model="form.email" />
        </el-form-item>
        <el-form-item label="密码" prop="password">
          <el-input v-model="form.password" type="password" />
        </el-form-item>
        <el-form-item label="性别" prop="gender">
          <el-select v-model="form.gender" placeholder="请选择">
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
          <el-button type="primary" :loading="loading" @click="onSubmit" style="width:100%;">注册</el-button>
        </el-form-item>
      </el-form>
      <div class="form-tip">
        已有账号？<a @click="goLogin">去登录</a>
      </div>
    </el-card>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import axios from 'axios'
import { ElMessage } from 'element-plus'

const router = useRouter()
const formRef = ref()
const loading = ref(false)
const form = ref({
  username: '',
  email: '',
  password: '',
  gender: '',
  birthday: '',
  language: ''
})
const rules = {
  username: [ { required: true, message: '请输入用户名', trigger: 'blur' } ],
  email: [ { required: true, message: '请输入邮箱', trigger: 'blur' }, { type: 'email', message: '邮箱格式不正确', trigger: 'blur' } ],
  password: [ { required: true, message: '请输入密码', trigger: 'blur' }, { min: 6, message: '密码至少6位', trigger: 'blur' } ],
  gender: [ { required: true, message: '请选择性别', trigger: 'change' } ],
  birthday: [ { required: true, message: '请选择生日', trigger: 'change' } ],
  language: [ { required: true, message: '请输入语言', trigger: 'blur' } ]
}
const goLogin = () => router.push('/login')
const onSubmit = () => {
  formRef.value.validate(async valid => {
    if (!valid) return
    loading.value = true
    try {
      const res = await axios.post('/api/user/register', form.value)
      if (res.data.code === 0) {
        ElMessage.success('注册成功，请登录')
        router.push('/login')
      } else {
        ElMessage.error(res.data.msg)
      }
    } catch (e) {
      ElMessage.error('注册失败')
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