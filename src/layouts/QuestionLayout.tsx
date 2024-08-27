import React from 'react'
import { Outlet } from 'react-router-dom'
import useLoadUserData from '../hooks/useLoadUserData'
import { useNavPage } from '../hooks/useNavPage'

export default function QuestionLayout() {
  const waitingUserData = useLoadUserData()
  useNavPage(waitingUserData)
  return <div style={{ height: '100vh' }}>{!waitingUserData && <Outlet></Outlet>}</div>
}
