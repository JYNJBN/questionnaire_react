import { useSelector } from 'react-redux'
import { StateType } from '../store'
import { ComponentsStateType } from '../store/componentsReducer'

// 定义一个回去Reduce里的ComponentList的方法
function getComponentInfo() {
  const components = useSelector<StateType>(state => state.components) as ComponentsStateType
  console.log('🚀 ~ getComponentInfo ~ components:', components)
  const selectedComponent = components.componentList.find(
    c => c.fe_id === components.currentSelectedId
  )
  const { componentList = [], currentSelectedId, copyComponent } = components
  return { componentList, currentSelectedId, selectedComponent, copyComponent }
}

export default getComponentInfo
