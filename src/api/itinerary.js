import request from './request'

// 行程相关 API
export const itineraryApi = {
  // 获取用户的所有行程
  getUserItineraries(userId) {
    return request.get('/itinerary/list', { params: { userId } })
  },

  // 根据ID获取行程详情
  getItineraryById(id) {
    return request.get(`/itinerary/${id}`)
  },

  // 创建新行程
  createItinerary(itinerary) {
    return request.post('/itinerary/create', itinerary)
  },

  // 更新行程信息
  updateItinerary(itinerary) {
    return request.put('/itinerary/update', itinerary)
  },

  // 删除行程
  deleteItinerary(id) {
    return request.delete(`/itinerary/${id}`)
  },

  // 根据目的地搜索行程
  searchItinerariesByDestination(destination) {
    return request.get('/itinerary/search', { params: { destination } })
  },

  // 根据状态获取行程
  getItinerariesByStatus(userId, status) {
    return request.get('/itinerary/status', { params: { userId, status } })
  }
} 