import axios, { ResDataType } from './index'
type SearchOption = {
  keyword: string
  isDeleted: boolean
  isPublished: boolean
  isStart: boolean
  page: number
  pageSize: number
  //
}
export async function getQuestionServiceApi(id: string): Promise<ResDataType> {
  const url = `/question/${id}`
  const data = await axios.get<ResDataType>(url)
  return data
}
export async function addQuestionServiceApi(): Promise<ResDataType> {
  const url = `/question`
  const data = await axios.post<ResDataType>(url)
  return data
}
export async function getQuestionListApi(opt: Partial<SearchOption>): Promise<ResDataType> {
  const url = `/question`
  const data = await axios.get<ResDataType>(url, { params: opt })
  return data
}
export async function updateQuestionApi(
  id: string,
  opt: { [key: string]: any }
): Promise<ResDataType> {
  const url = `/question/${id}`
  const data = await axios.patch<ResDataType>(url, { params: opt })
  return data
}
export async function duplicateQuestionApi(id: string) {
  const url = `/question/duplicate/${id}`
  const data = await axios.post<ResDataType>(url)
  return data
}
export async function deleteQuestionsApi(ids: string[]): Promise<ResDataType> {
  const url = '/question'
  const data = (await axios.delete(url, { data: { ids } })) as ResDataType
  return data
}
