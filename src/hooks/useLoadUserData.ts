import { useRequest } from 'ahooks'
import { useEffect, useState } from 'react'
import { useGetUserInfo } from './useGetUserInfo'
import { getUserInfoApi } from '../services/user'
import { useDispatch } from 'react-redux'
import { loginReducer } from '../store/userReducer'

function useLoadUserData() {
  const [waitingUserData, setWaitingUserData] = useState(true)
  const { username } = useGetUserInfo()
  const dispatch = useDispatch()
  const { run } = useRequest(getUserInfoApi, {
    manual: true,
    onSuccess: result => {
      const { username, nickname } = result
      dispatch(loginReducer({ username, nickname }))
    },
    onFinally: () => {
      setWaitingUserData(false)
    },
  })
  useEffect(() => {
    // 如果存在用户信息就不再等待
    if (username) {
      setWaitingUserData(false)
      return
    }
    run()
  }, [username])
  return waitingUserData
}
export default useLoadUserData
