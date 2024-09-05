import { produce } from 'immer'
import { ComponentsPropsType } from './../../components/QuestionComponents/index'
import { createSlice, nanoid, PayloadAction } from '@reduxjs/toolkit'
import { getNextSelectedId, insertNewComponent } from './utils'
import _ from 'lodash'
import { arrayMove } from '@dnd-kit/sortable'
export type ComponentInfoType = {
  fe_id: string
  type: string
  title: string
  props: ComponentsPropsType
  isHidden?: boolean
  isLocked?: boolean
}
export type ComponentsStateType = {
  componentList: Array<ComponentInfoType>
  currentSelectedId: string
  // 用来存储复制组件
  copyComponent?: ComponentInfoType | null
  isPublished?: boolean
}
const INIT_STATE: ComponentsStateType = {
  componentList: [],
  currentSelectedId: '',
  copyComponent: null,
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
        const newComponent = action.payload
        insertNewComponent(draft, newComponent)
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
    // 删除组
    removeSelectedComponent: produce((draft: ComponentsStateType) => {
      // 这里不用额外传递选中的id
      const { componentList = [], currentSelectedId: removedId } = draft
      const newSelectedId = getNextSelectedId(removedId, componentList)
      draft.currentSelectedId = newSelectedId
      const index = componentList.findIndex(c => c.fe_id === removedId)
      componentList.splice(index, 1)
      // 重新计算 selectedId
    }),
    // 隐藏组件
    changeComponentHidden: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; isHidden: boolean }>) => {
        // 这里不用额外传递选中的id
        const { componentList = [] } = draft
        const { fe_id, isHidden } = action.payload
        const newSelectedId = getNextSelectedId(fe_id, componentList)
        if (isHidden) {
          // 隐藏
          draft.currentSelectedId = newSelectedId
        } else {
          // 显示
          draft.currentSelectedId = fe_id
        }
        const component = componentList.find(c => c.fe_id === fe_id)
        if (component) component.isHidden = isHidden
        // 重新计算 selectedId
      }
    ),
    // 隐藏组件
    toggleComponentLocked: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string }>) => {
        // 这里不用额外传递选中的id
        const { componentList = [] } = draft
        const { fe_id } = action.payload
        const component = componentList.find(c => c.fe_id === fe_id)
        if (component) component.isLocked = !component.isLocked
      }
    ),
    // 拷贝当前选中的组件
    copySelectedComponent: produce((draft: ComponentsStateType) => {
      // 这里不用额外传递选中的id
      const { componentList = [], currentSelectedId } = draft
      const component = componentList.find(c => c.fe_id === currentSelectedId)
      if (component) {
        draft.copyComponent = _.cloneDeep(component)
      }
    }),
    // 粘贴组件
    pasteCopiedComponent: produce((draft: ComponentsStateType) => {
      const { copyComponent } = draft
      if (copyComponent == null) return
      // 要把 fe_id 给修改了，重要！！
      copyComponent.fe_id = nanoid()
      // 插入 copiedComponent
      insertNewComponent(draft, copyComponent)
    }),
    // 选中上一个
    selectPrevComponent: produce((draft: ComponentsStateType) => {
      const { componentList, currentSelectedId } = draft
      const currentSelectedIndex = componentList.findIndex(c => c.fe_id === currentSelectedId)
      // 小于0是没选中，等于0是第一个不需要移动
      if (currentSelectedIndex <= 0) return
      draft.currentSelectedId = componentList[currentSelectedIndex - 1].fe_id
    }),
    // 选中下一个
    selectNextComponent: produce((draft: ComponentsStateType) => {
      const { componentList, currentSelectedId } = draft
      const currentSelectedIndex = componentList.findIndex(c => c.fe_id === currentSelectedId)
      // 小于0是没选中
      if (currentSelectedIndex < 0) return
      // 是最后一个不需要移动
      if (currentSelectedIndex === componentList.length - 1) return
      draft.currentSelectedId = componentList[currentSelectedIndex + 1].fe_id
    }),
    // 修改组件标题
    changeComponentTitle: produce(
      (draft: ComponentsStateType, action: PayloadAction<{ fe_id: string; title: string }>) => {
        const { title, fe_id } = action.payload
        const curComp = draft.componentList.find(c => c.fe_id === fe_id)
        if (curComp) curComp.title = title
      }
    ),
    // 移动组件位置
    moveComponent: produce(
      (
        draft: ComponentsStateType,
        action: PayloadAction<{ oldIndex: number; newIndex: number }>
      ) => {
        const { componentList: curComponentList } = draft
        const { oldIndex, newIndex } = action.payload

        draft.componentList = arrayMove(curComponentList, oldIndex, newIndex)
      }
    ),
  },
})

export const {
  resetComponents,
  setCurrentSelectedId,
  addComponent,
  changeComponentProps,
  removeSelectedComponent,
  changeComponentHidden,
  toggleComponentLocked,
  copySelectedComponent,
  pasteCopiedComponent,
  selectPrevComponent,
  selectNextComponent,
  changeComponentTitle,
  moveComponent,
} = componentsSlice.actions
export default componentsSlice.reducer
