import axios from 'axios'
import store from 'store'
import { notification } from 'ant-design-vue'

// env
const apiClient = axios.create({
  baseURL: process.env.VUE_APP_API_URL,
  timeout: 360000,
  // headers: { 'Access-Control-Allow-Origin': '*', 'Content-type': 'application/json' },
})

apiClient.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

apiClient.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data,
    })
  }
})

export default apiClient
