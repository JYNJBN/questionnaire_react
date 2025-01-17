import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { PageInfoType } from '../store/pageInfoReducer'

export function useGetPageInfo() {
  const pageInfo = useSelector<StateType>(state => state.pageInfo)
  return pageInfo as PageInfoType
}
