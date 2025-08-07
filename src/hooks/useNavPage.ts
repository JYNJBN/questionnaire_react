import { useLocation, useNavigate } from 'react-router-dom'
import { useEffect } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { LOGIN_URL, MANAGE_LIST_URL, REGISTER_URL } from '../constant/routerConstant'
import { isLoginOrRegister, isNoNeedUserInfo } from '../utils/router-intercept'
import { getToken } from '../utils/user-token'
// react没有像vue路由一样的拦截器，这里可以使用hook去实现类似效果
export function useNavPage(waitingUserData: boolean) {
  const { username } = useGetUserInfo()
  const { pathname } = useLocation()
  const token =getToken()
  const nav = useNavigate()
  useEffect(() => {
    if (waitingUserData) {
      return
    }
    // 登录了
    console.log(token)

    if (token) {
      if (isLoginOrRegister(pathname)) {
        console.log('登录了')
        nav(MANAGE_LIST_URL)
      }
      return
    }
    // 未登录
    if (isNoNeedUserInfo(pathname)) {
      return
    } else {
      nav(LOGIN_URL)
    }
  }, [waitingUserData, username, pathname])
}
