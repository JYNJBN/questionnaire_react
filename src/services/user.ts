import { ResDataType } from './index'
import axios from './index'

// 获取用户信息
export async function getUserInfoApi(): Promise<ResDataType> {
  const url = 'user/info'
  const data = (await axios.get(url)) as ResDataType
  return data
}

// 注册用户
export async function registerApi(
  username: string,
  password: string,
  nickname?: string
): Promise<ResDataType> {
  const url = 'user/register'
  const body = { username, password, nickname: nickname || username }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}

// 登录
export async function loginApi(username: string, password: string): Promise<ResDataType> {
  const url = 'user/login'
  const body = { username, password }
  const data = (await axios.post(url, body)) as ResDataType
  return data
}
