import { HOME_URL, LOGIN_URL, REGISTER_URL } from '../constant/routerConstant'

export function isLoginOrRegister(pathname: string) {
  return [LOGIN_URL, REGISTER_URL].includes(pathname)
}
export function isNoNeedUserInfo(pathname: string) {
  return [HOME_URL, LOGIN_URL, REGISTER_URL].includes(pathname)
}
