import axios from 'axios'
import { message } from 'antd'
const instance = axios.create({
  baseURL: '/api',
  timeout: 10000,
})
instance.interceptors.response.use(res => {
  const resData = (res.data || {}) as ResType
  const { errno, data, msg } = resData
  if (errno != 0) {
    // 错误
    if (msg) {
      message.error(msg)
    }
    throw new Error(msg)
  }
  return data as any
})
export type ResType = {
  errno: number
  data?: ResDataType
  msg?: string
}
export type ResDataType = {
  [key: string]: any
}
export default instance
