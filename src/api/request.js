import axios from 'axios'

const instance = axios.create({
  baseURL: '/api'
})

instance.interceptors.response.use(
  res => res.data,
  err => {
    if (err.response && err.response.data && err.response.data.msg) {
      alert(err.response.data.msg)
    }
    return Promise.reject(err)
  }
)

export default instance 