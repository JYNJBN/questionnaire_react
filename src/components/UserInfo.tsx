import React, { FC } from 'react'
import { Button, message } from 'antd'
import { Link, useNavigate } from 'react-router-dom'
import { UserOutlined } from '@ant-design/icons'
// import { useDispatch } from 'react-redux'
// import { useRequest } from 'ahooks'
// import { getUserInfoService } from '../services/user'
import { removeToken } from '../utils/user-token'
import { useRequest } from 'ahooks'
import { getUserInfoApi } from '../services/user'
import { LOGIN_URL } from '../constant/routerConstant'
import { useGetUserInfo } from '../hooks/useGetUserInfo'
import { useDispatch } from 'react-redux'
import { logoutReducer } from '../store/userReducer'

const UserInfo: FC = () => {
  const nav = useNavigate()
  const dispatch = useDispatch()

  const { data } = useRequest(getUserInfoApi) // ajax
  console.log(data)

  const { username, nickname } = useGetUserInfo() // 从 redux 中获取用户信息

  function logout() {
    removeToken() // 先清除 token
    dispatch(logoutReducer()) // 再清空 redux user 数据
    message.success('退出成功')
    nav(LOGIN_URL)
  }

  const UserInfo = (
    <>
      <span style={{ color: '#e8e8e8' }}>
        <UserOutlined />
        {nickname}
      </span>
      <Button type="link" onClick={logout}>
        退出
      </Button>
    </>
  )

  const Login = <Link to={LOGIN_URL}>登录</Link>

  return <div>{username ? UserInfo : Login}</div>
}

export default UserInfo
