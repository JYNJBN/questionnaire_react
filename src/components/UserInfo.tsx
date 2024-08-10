import React from 'react'
import { Link } from 'react-router-dom'
import { LOGIN_URL } from '../utils/constant'

export default function UserInfo() {
  return (
    <>
      <Link to={LOGIN_URL}>登录</Link>
    </>
  )
}
