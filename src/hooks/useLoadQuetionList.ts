import { useRequest } from 'ahooks'
import { getQuestionListApi } from '../services/question'
import { useSearchParams } from 'react-router-dom'
import {
  LIST_PAGE_PARAM_KEY,
  LIST_PAGESIZE_LIMIT,
  LIST_PAGESIZE_PARAM_KEY,
  LIST_SEARCH_PARAM_KEY,
} from '../constant/searchConstant'
type optType = {
  isDeleted: boolean
  isStart: boolean
  page: number
  pageSize: number
}

function useLoadingQuestionList(opt: Partial<optType> = {}) {
  const [searchParams] = useSearchParams()
  const { isDeleted, isStart } = opt
  const { data, loading, error, refresh } = useRequest(
    async () => {
      const keyword = searchParams.get(LIST_SEARCH_PARAM_KEY) || ''
      const page = parseInt(searchParams.get(LIST_PAGE_PARAM_KEY) || '') || 1
      const pageSize =
        parseInt(searchParams.get(LIST_PAGESIZE_PARAM_KEY) || '') || LIST_PAGESIZE_LIMIT
      const data = await getQuestionListApi({ keyword, isDeleted, isStart, page, pageSize })
      return data
    },
    {
      // 地址栏url中参数改变就发起请求
      refreshDeps: [searchParams],
    }
  )
  return { data, loading, error, refresh }
}
export { useLoadingQuestionList }
