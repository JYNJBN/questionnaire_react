import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import {
  ComponentInfoType,
  moveComponent,
  setCurrentSelectedId,
} from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'
import { SortableContainer } from '../../../components/DragSortable/SortableContainer'
import { SortableItem } from '../../../components/DragSortable/SortableItem'

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf === null || componentConf === undefined) return null
  const { Component } = componentConf
  return <Component {...props} />
}

export const EditCanvas: FC<{ loading: boolean }> = props => {
  const { componentList, currentSelectedId } = useGetComponentInfo()
  const dispatch = useDispatch()
  useBindCanvasKeyPress()
  function setSelectId(e: MouseEvent, fe_id: string) {
    e.stopPropagation()
    dispatch(setCurrentSelectedId(fe_id))
  }
  // SortableContainer 组件的 items 属性，需要每个 item 都有 id
  const componentListWithId = componentList.map(c => {
    return { ...c, id: c.fe_id }
  })
  // 拖拽排序后的操作
  function handleDragEnd(oldIndex: number, newIndex: number) {
    console.log('oldIndex:', oldIndex, 'newIndex:', newIndex)
    dispatch(moveComponent({ oldIndex, newIndex }))
  }
  const { loading } = props
  if (loading) {
    return (
      <div style={{ textAlign: 'center', marginTop: '24px' }}>
        <Spin></Spin>
      </div>
    )
  }
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      <div className={styles.canvas}>
        {componentList
          .filter(c => c.isHidden != true)
          .map(c => {
            const { fe_id, isLocked } = c
            const selectedClassName = styles.selected
            const wrapperDefaultClassName = styles['component-wrapper']
            const lockedClassName = styles.locked
            const wrapperClassName = classNames({
              [wrapperDefaultClassName]: true,
              [selectedClassName]: fe_id === currentSelectedId,
              [lockedClassName]: isLocked,
            })
            return (
              <SortableItem key={fe_id} id={fe_id}>
                <div
                  className={wrapperClassName}
                  onClick={e => {
                    setSelectId(e, fe_id)
                  }}
                >
                  <div className={styles['component']}>{getComponent(c)}</div>
                </div>
              </SortableItem>
            )
          })}
      </div>
    </SortableContainer>
  )
}
