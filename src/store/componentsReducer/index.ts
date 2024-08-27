import { produce } from 'immer'
import { ComponentsPropsType } from './../../components/QuestionComponents/index'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentsPropsType
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  currentSelectedId: string
}
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  currentSelectedId: '',
}

export const componentsSlice = createSlice({
  name: 'components',
  initialState: INIT_STATE,
  reducers: {
    resetComponents(state: ComponentsStateType, action: PayloadAction<ComponentsStateType>) {
      return action.payload
    },
    // 修改 selectedId
    setCurrentSelectedId: produce((draft: ComponentsStateType, action: PayloadAction<string>) => {
      draft.currentSelectedId = action.payload
    }),
    // setCurrentSelectedId(state: ComponentsStateType, action: PayloadAction<string>) {
    //   state.currentSelectedId = action.payload
    // },
    // 新增组件
    addComponent: produce(
      (draft: ComponentsStateType, action: PayloadAction<ComponentInfoType>) => {
        const { currentSelectedId, componentList } = draft
        const index = componentList.findIndex(item => item.fe_id === currentSelectedId)
        if (index) {
          componentList.splice(index + 1, 0, action.payload)
        } else {
          componentList.push(action.payload)
        }
        draft.currentSelectedId = action.payload.fe_id
      }
    ),
    // 修改组件属性
    changeComponentProps: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ fe_id: string; newProps: Partial<ComponentsPropsType> }>
      ) => {
        const { fe_id, newProps } = action.payload
        const { componentList } = draft
        const component = componentList.find(c => c.fe_id === fe_id)
        if (component) {
          component.props = { ...component.props, ...newProps }
        }
      }
    ),
  },
})

export const { resetComponents, setCurrentSelectedId, addComponent, changeComponentProps } =
  componentsSlice.actions
export default componentsSlice.reducer
