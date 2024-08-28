import React from 'react'
import getComponentInfo from '../../../hooks/useGetComponentInfo'
import { ComponentsPropsType, getComponentConfByType } from '../../../components/QuestionComponents'
import { useDispatch } from 'react-redux'
import { changeComponentProps } from '../../../store/componentsReducer'

function NoProp() {
  return <div style={{ textAlign: 'center' }}>为选中组件</div>
}

export const ComponentProp = () => {
  const dispatch = useDispatch()
  function onChange(newProps: Partial<ComponentsPropsType>) {
    console.log(newProps)
    dispatch(changeComponentProps({ fe_id, newProps }))
  }
  const { selectedComponent } = getComponentInfo()
  if (selectedComponent == null) return <NoProp />
  const { type, props, fe_id, isLocked } = selectedComponent
  const componentConf = getComponentConfByType(type)
  if (componentConf == null) return <NoProp />
  const { PropComponent } = componentConf
  return <PropComponent {...props} onChange={onChange} disable={isLocked} />
}
