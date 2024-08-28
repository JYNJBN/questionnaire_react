import React, { FC, MouseEvent } from 'react'
import styles from './EditCanvas.module.scss'
import { Spin } from 'antd'
import getComponentInfo from '../../../hooks/useGetComponentInfo'
import { getComponentConfByType } from '../../../components/QuestionComponents'
import { ComponentInfoType, setCurrentSelectedId } from '../../../store/componentsReducer'
import { useDispatch } from 'react-redux'
import classNames from 'classnames'
import useBindCanvasKeyPress from '../../../hooks/useBindCanvasKeyPress'

function getComponent(componentInfo: ComponentInfoType) {
  const { type, props } = componentInfo
  const componentConf = getComponentConfByType(type)
  if (componentConf === null || componentConf === undefined) return null
  const { Component } = componentConf
  return <Component {...props} />
}

export const EditCanvas: FC<{ loading: boolean }> = props => {
  const { componentList, currentSelectedId } = getComponentInfo()
  const dispatch = useDispatch()
  useBindCanvasKeyPress()
  function setSelectId(e: MouseEvent, fe_id: string) {
    e.stopPropagation()
    dispatch(setCurrentSelectedId(fe_id))
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
            <div
              key={fe_id}
              className={wrapperClassName}
              onClick={e => {
                setSelectId(e, fe_id)
              }}
            >
              <div className={styles['component']}>{getComponent(c)}</div>
            </div>
          )
        })}
    </div>
  )
}
