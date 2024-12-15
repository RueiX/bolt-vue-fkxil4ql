import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'
import { ElMessage, ElMessageBox } from 'element-plus'
import store from '@/store'
import { getToken, saveRefreshtime, getTokenRefreshTime } from '@/utils/auth'
import { sign, GetRandomString } from '@/utils/signature'
import router from '@/router'

export interface ResponseData {
  ErrCode: string;
  ErrMsg?: string;
  [key: string]: any;
}

// 是否显示重新登录
export const isRelogin = { show: false }

const service: AxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_APP_BASE_API,
  timeout: 10000
})

service.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8'

// 请求拦截器
service.interceptors.request.use(
  (config: AxiosRequestConfig) => {
    if (!config.headers) {
      config.headers = {}
    }

    if (config.headers['Content-Type'] === undefined) {
      config.headers['Content-Type'] = 'application/json;charset=UTF-8'
    }

    const token = getToken()
    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`
    }

    // 签名处理
    const isSign = config.headers['sign']
    if (isSign || isSign === undefined) {
      const timeStamp = new Date().getTime().toString().substring(0, 10)
      const nonce = GetRandomString()
      config.headers['appId'] = store.getters.appId
      config.headers['nonce'] = nonce
      config.headers['timeStamp'] = timeStamp
      config.headers['signature'] = sign(config, nonce, timeStamp, store.getters.appSecret)
    }

    saveRefreshtime()
    return config
  },
  error => Promise.reject(error)
)

// 响应拦截器
service.interceptors.response.use(
  (response: AxiosResponse<ResponseData>) => {
    const res = response.data

    if (res.ErrCode !== '0') {
      if (res.ErrCode === '401') {
        const curTime = new Date()
        const refreshTime = new Date(Date.parse(getTokenRefreshTime() || ''))
        
        if (getTokenRefreshTime() && curTime <= refreshTime) {
          return store.dispatch('ResetToken').then(() => {
            location.reload()
            return Promise.reject(new Error('Token已刷新，请重试'))
          })
        }
      } else if (res.ErrCode === '403') {
        router.push({
          path: '/403',
          query: { redirect: router.currentRoute.value.fullPath }
        })
        return Promise.reject(new Error('没有权限'))
      } else if (res.ErrCode === '40000' || res.ErrCode === '4008') {
        if (!isRelogin.show) {
          isRelogin.show = true
          ElMessageBox.confirm(
            '登录状态已过期，您可以继续留在该页面，或者重新登录',
            '系统提示',
            {
              confirmButtonText: '重新登录',
              cancelButtonText: '取消',
              type: 'warning'
            }
          ).then(() => {
            isRelogin.show = false
            return store.dispatch('FedLogOut').then(() => {
              location.href = '/index'
            })
          }).catch(() => {
            isRelogin.show = false
          })
        }
        return Promise.reject(new Error('无效的会话，或者会话已过期，请重新登录。'))
      } else if (res.ErrCode === '200') {
        return res
      }

      ElMessage({
        message: res.ErrMsg || 'Error',
        type: 'error',
        duration: 5000
      })
      return Promise.reject(new Error(res.ErrMsg))
    }

    return res
  },
  error => {
    let message = '未知错误'
    if (error.message === 'Network Error') {
      message = '后端接口连接异常'
    } else if (error.message.includes('timeout')) {
      message = '系统接口请求超时'
    } else if (error.message.includes('Request failed with status code')) {
      message = '系统接口' + error.message.substr(error.message.length - 3) + '异常'
    }

    ElMessage({
      message,
      type: 'error',
      duration: 5000
    })
    return Promise.reject(error)
  }
)

export default service