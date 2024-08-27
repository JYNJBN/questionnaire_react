import { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import { getQuestionServiceApi } from '../services/question'
import { useRequest } from 'ahooks'
import { useDispatch } from 'react-redux'
import { resetComponents } from '../store/componentsReducer'
function useLoadingQuestionData() {
  const { id = '' } = useParams()
  const dispatch = useDispatch()
  const { data, error, run, loading } = useRequest(
    async (id: string) => {
      if (!id) throw new Error('没有问卷 id')
      const data = await getQuestionServiceApi(id)
      console.log('🚀 ~ data:', data)

      return data
    },
    {
      manual: true,
    }
  )
  // 获取到id问卷的data数据后去设置redux
  useEffect(() => {
    if (!data) return
    const { title, componentList = [] } = data as any
    // 默认选中第一项
    dispatch(resetComponents({ componentList, currentSelectedId: componentList[0].fe_id }))
  }, [data])
  useEffect(() => {
    run(id)
  }, [id])

  return { loading, error }
}
export default useLoadingQuestionData
