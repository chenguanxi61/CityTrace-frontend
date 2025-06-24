<template>
  <el-header class="navbar">
    <div class="navbar-left">
      <img src="/vite.svg" alt="logo" class="logo" />
      <span class="app-name">市迹</span>
    </div>
    <el-menu mode="horizontal" :default-active="activeMenu" class="navbar-menu" router>
      <el-menu-item index="/">首页</el-menu-item>
      <el-menu-item index="/itinerary">我的行程</el-menu-item>
      <el-menu-item index="/journal">旅行日志</el-menu-item>
      <el-menu-item index="/map">地图</el-menu-item>
    </el-menu>
    <div class="navbar-right">
      <el-dropdown>
        <span class="el-dropdown-link">
          <el-avatar :size="32" src="/javascript.svg" />
        </span>
        <template #dropdown>
          <el-dropdown-menu>
            <el-dropdown-item @click="goProfile">个人资料</el-dropdown-item>
            <el-dropdown-item @click="goSettings">设置</el-dropdown-item>
            <el-dropdown-item divided @click="logout">退出</el-dropdown-item>
          </el-dropdown-menu>
        </template>
      </el-dropdown>
      <el-select v-model="lang" class="lang-switch" size="small" style="width: 80px; margin-left: 16px;">
        <el-option label="中文" value="zh" />
        <el-option label="English" value="en" />
        <el-option label="日本語" value="jp" />
      </el-select>
    </div>
  </el-header>
</template>

<script setup>
import { ref } from 'vue'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const activeMenu = ref(route.path)
const lang = ref('zh')

const goProfile = () => router.push('/profile')
const goSettings = () => router.push('/settings')
const logout = () => {
  localStorage.removeItem('user')
  router.push('/login')
}
</script>

<style scoped>
.navbar {
  display: flex;
  align-items: center;
  background: #fff;
  box-shadow: 0 2px 8px #f0f1f2;
  padding: 0 32px;
  height: 64px;
  z-index: 100;
}
.navbar-left {
  display: flex;
  align-items: center;
  margin-right: 32px;
}
.logo {
  width: 36px;
  height: 36px;
  margin-right: 12px;
}
.app-name {
  font-size: 22px;
  font-weight: bold;
  color: #409eff;
}
.navbar-menu {
  flex: 1;
  border-bottom: none;
  background: transparent;
}
.navbar-right {
  display: flex;
  align-items: center;
}
.lang-switch {
  margin-left: 16px;
}
</style> 