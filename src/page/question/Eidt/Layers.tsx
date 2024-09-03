import React, { ChangeEvent, useState } from 'react'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
import { componentConfList } from '../../../components/QuestionComponents'
import { EyeInvisibleFilled, LockOutlined } from '@ant-design/icons'
import styles from './Layers.module.scss'
import classNames from 'classnames'
import { Button, Input, message, Space } from 'antd'
import { useDispatch } from 'react-redux'
import {
  changeComponentHidden,
  changeComponentTitle,
  moveComponent,
  setCurrentSelectedId,
  toggleComponentLocked,
} from '../../../store/componentsReducer'
import { SortableContainer } from '../../../components/DragSortable/SortableContainer'
import { SortableItem } from '../../../components/DragSortable/SortableItem'
export const Layers = () => {
  const { componentList, currentSelectedId } = useGetComponentInfo()
  const titleDefaultClassName = styles.title
  const selectedClassName = styles.selected
  const dispatch = useDispatch()
  const [changingTitleId, setChangingTitleId] = useState('')
  // 点击选中组件
  function handleTitleClick(fe_id: string) {
    const curComp = componentList.find(c => c.fe_id === fe_id)
    if (curComp?.isHidden) {
      message.info('不能选中隐藏的组件')
      return
    }
    if (fe_id !== currentSelectedId) {
      dispatch(setCurrentSelectedId(fe_id))
      setChangingTitleId('')
      return
    }
    // 选中了再次点击赋值，用于让文字变成输入框显示
    setChangingTitleId(fe_id)
  }
  // 修改标题
  function changeTitle(e: ChangeEvent<HTMLInputElement>) {
    const newTitle = e.target.value.trim()
    if (!currentSelectedId) return
    if (!newTitle) return
    dispatch(changeComponentTitle({ fe_id: currentSelectedId, title: newTitle }))
  }
  // 切换 隐藏 显示
  function toggleHidden(fe_id: string, isHidden: boolean) {
    dispatch(changeComponentHidden({ fe_id, isHidden }))
  }
  // 切换 锁定 解锁
  function toggleLock(fe_id: string) {
    dispatch(toggleComponentLocked({ fe_id }))
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
  return (
    <SortableContainer items={componentListWithId} onDragEnd={handleDragEnd}>
      {componentList.map(c => {
        const { fe_id, title, isHidden, isLocked } = c
        const titleClassName = classNames({
          [titleDefaultClassName]: true,
          [selectedClassName]: fe_id === currentSelectedId,
        })
        return (
          <SortableItem key={fe_id} id={fe_id}>
            <div className={styles.wrapper}>
              <div className={titleClassName} onClick={() => handleTitleClick(fe_id)}>
                {changingTitleId !== fe_id && title}
                {changingTitleId === fe_id && (
                  <Input
                    value={title}
                    onChange={e => {
                      changeTitle(e)
                    }}
                    onPressEnter={() => setChangingTitleId('')}
                    onBlur={() => setChangingTitleId('')}
                  />
                )}
              </div>
              <div className={styles.handler}>
                <Space>
                  <Button
                    size="small"
                    shape="circle"
                    className={isHidden ? styles.btn : ''}
                    icon={<EyeInvisibleFilled />}
                    type={isHidden ? 'primary' : 'text'}
                    onClick={() => toggleHidden(fe_id, !isHidden)}
                  />
                  <Button
                    size="small"
                    shape="circle"
                    className={isLocked ? styles.btn : ''}
                    icon={<LockOutlined />}
                    type={isLocked ? 'primary' : 'text'}
                    onClick={() => toggleLock(fe_id)}
                  />
                </Space>
              </div>
            </div>
          </SortableItem>
        )
      })}
    </SortableContainer>
  )
}
