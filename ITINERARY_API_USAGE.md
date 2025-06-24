# 行程 API 使用说明

## 导入 API

```javascript
import { itineraryApi } from '../api/itinerary'
```

## API 方法

### 1. 获取用户的所有行程
```javascript
// 获取指定用户的所有行程
const res = await itineraryApi.getUserItineraries(userId)
if (res.code === 0) {
  console.log('行程列表:', res.list)
}
```

### 2. 根据ID获取行程详情
```javascript
// 获取指定ID的行程详情
const res = await itineraryApi.getItineraryById(id)
if (res.code === 0) {
  console.log('行程详情:', res.itinerary)
}
```

### 3. 创建新行程
```javascript
// 创建新行程
const newItinerary = {
  userId: 1,
  destinationId: 1,
  day: 1,
  place: '故宫',
  startTime: '09:00:00',
  endTime: '12:00:00'
}
const res = await itineraryApi.createItinerary(newItinerary)
if (res.code === 0) {
  console.log('创建成功')
}
```

### 4. 更新行程信息
```javascript
// 更新行程信息
const updateData = {
  id: 1,
  userId: 1,
  destinationId: 1,
  day: 1,
  place: '故宫博物院',
  startTime: '09:30:00',
  endTime: '12:30:00'
}
const res = await itineraryApi.updateItinerary(updateData)
if (res.code === 0) {
  console.log('更新成功')
}
```

### 5. 删除行程
```javascript
// 删除指定ID的行程
const res = await itineraryApi.deleteItinerary(id)
if (res.code === 0) {
  console.log('删除成功')
}
```

### 6. 根据目的地搜索行程
```javascript
// 搜索包含指定目的地的行程
const res = await itineraryApi.searchItinerariesByDestination('北京')
if (res.code === 0) {
  console.log('搜索结果:', res.list)
}
```

### 7. 根据状态获取行程
```javascript
// 获取指定用户和状态的行程
const res = await itineraryApi.getItinerariesByStatus(userId, 'active')
if (res.code === 0) {
  console.log('状态行程:', res.list)
}
```

## 完整使用示例

```vue
<template>
  <div>
    <el-button @click="loadItineraries">加载行程</el-button>
    <el-button @click="createItinerary">创建行程</el-button>
    
    <el-table :data="itineraries">
      <el-table-column prop="place" label="地点" />
      <el-table-column prop="day" label="天数" />
      <el-table-column prop="startTime" label="开始时间" />
      <el-table-column prop="endTime" label="结束时间" />
      <el-table-column label="操作">
        <template #default="scope">
          <el-button @click="viewDetail(scope.row.id)">详情</el-button>
          <el-button @click="deleteItinerary(scope.row.id)">删除</el-button>
        </template>
      </el-table-column>
    </el-table>
  </div>
</template>

<script setup>
import { ref } from 'vue'
import { itineraryApi } from '../api/itinerary'
import { ElMessage } from 'element-plus'

const itineraries = ref([])

// 加载行程列表
const loadItineraries = async () => {
  try {
    const res = await itineraryApi.getUserItineraries(1) // 假设用户ID为1
    if (res.code === 0) {
      itineraries.value = res.list
    }
  } catch (error) {
    ElMessage.error('加载失败')
  }
}

// 创建行程
const createItinerary = async () => {
  try {
    const newItinerary = {
      userId: 1,
      destinationId: 1,
      day: 1,
      place: '故宫',
      startTime: '09:00:00',
      endTime: '12:00:00'
    }
    const res = await itineraryApi.createItinerary(newItinerary)
    if (res.code === 0) {
      ElMessage.success('创建成功')
      loadItineraries() // 重新加载列表
    }
  } catch (error) {
    ElMessage.error('创建失败')
  }
}

// 查看详情
const viewDetail = async (id) => {
  try {
    const res = await itineraryApi.getItineraryById(id)
    if (res.code === 0) {
      console.log('行程详情:', res.itinerary)
    }
  } catch (error) {
    ElMessage.error('获取详情失败')
  }
}

// 删除行程
const deleteItinerary = async (id) => {
  try {
    const res = await itineraryApi.deleteItinerary(id)
    if (res.code === 0) {
      ElMessage.success('删除成功')
      loadItineraries() // 重新加载列表
    }
  } catch (error) {
    ElMessage.error('删除失败')
  }
}
</script>
```

## 注意事项

1. 所有 API 调用都会返回统一的格式：
   ```javascript
   {
     code: 0,        // 0表示成功，1表示失败
     msg: "消息",     // 提示信息
     data: {...}     // 数据（如果有）
   }
   ```

2. 记得处理错误情况，使用 try-catch 包装 API 调用

3. 在删除操作前，建议添加确认对话框

4. 创建和更新操作后，通常需要重新加载列表数据 