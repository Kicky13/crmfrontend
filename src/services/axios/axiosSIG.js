import axios from 'axios'
import store from 'store'
import { notification } from 'ant-design-vue'

// env
const apiClientSIG = axios.create({
  baseURL: process.env.VUE_APP_API_SIG_URL,
  timeout: 360000,
  // headers: {
  //   Accept: 'application/json',
  //   'Access-Control-Allow-Origin': 'Authorization',
  //   'Content-Type': 'application/json',
  //   'X-Requested-With': 'XMLHttpRequest',
  // },
  mode: 'no-cors',
  credentials: true,
  crossdomain: true,
})

apiClientSIG.interceptors.request.use(request => {
  const accessToken = store.get('accessToken')
  if (accessToken) {
    request.headers.Authorization = `Bearer ${accessToken}`
  }
  return request
})

apiClientSIG.interceptors.response.use(undefined, error => {
  // Errors handling
  const { response } = error
  const { data } = response
  if (data) {
    notification.warning({
      message: data,
    })
  }
})

export default apiClientSIG
