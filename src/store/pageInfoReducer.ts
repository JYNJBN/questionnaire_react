import { produce } from 'immer'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'

export type PageInfoType = {
  title: string
  desc?: string
  js?: string
  css?: string
  isPublished?: boolean
}
const INIT_STATE: PageInfoType = {
  title: '',
  desc: '',
  js: '',
  css: '',
}

export const pageInfoSlice = createSlice({
  name: 'pageInfo',
  initialState: INIT_STATE,
  reducers: {
    resetPageInfo: (state: PageInfoType, action: PayloadAction<PageInfoType>) => action.payload,
    // 修改标题
    changePageTitle: produce((state: PageInfoType, action: PayloadAction<string>) => {
      state.title = action.payload
    }),
  },
})

export const { resetPageInfo, changePageTitle } = pageInfoSlice.actions
export default pageInfoSlice.reducer
