import axios, { ResDataType } from './index'

type SearchOption = {
  page: number
  pageSize: number
}
export async function getStartListApi(
  questionId: string,
  opt: Partial<SearchOption>
): Promise<ResDataType> {
  const url = `/stat/${questionId}`
  const data = await axios.get<ResDataType>(url, { params: opt })
  return data
}
export async function getComponentStartListApi(
  questionId: string,
  componentId: string
): Promise<ResDataType> {
  const url = `/stat/${questionId}/${componentId}`
  const data = await axios.get<ResDataType>(url)
  return data
}
