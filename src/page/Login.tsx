import React from 'react'
import { useNavigate } from 'react-router-dom'
export default function Login() {
  const nav = useNavigate()
  const toHome = () => {
    nav('/home')
  }
  return (
    <div>
      Login
      <button onClick={toHome}>首页</button>
    </div>
  )
}
