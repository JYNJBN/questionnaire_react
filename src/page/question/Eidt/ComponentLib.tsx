import React, { FC, useState } from 'react'
import { componentConfGroup, ComponentConfType } from '../../../components/QuestionComponents'
import { Typography } from 'antd'
import styles from './ComponentLib.module.scss'
import { useDispatch } from 'react-redux'
import { addComponent } from '../../../store/componentsReducer'
import { nanoid } from '@reduxjs/toolkit'
const { Title } = Typography
function getComponent(c: ComponentConfType) {
  const { Component, title, type, defaultProps } = c
  const dispatch = useDispatch()
  function handleClick() {
    dispatch(
      addComponent({
        fe_id: nanoid(),
        type,
        title,
        props: defaultProps,
      })
    )
  }
  return (
    <div key={nanoid()} className={styles.wrapper} onClick={handleClick}>
      <div className={styles.component}>
        <Component />
      </div>
    </div>
  )
}

export const ComponentLib: FC = () => {
  return (
    <>
      {componentConfGroup.map(group => {
        const { groupId, groupName, components } = group
        console.log(groupId)

        return (
          <div key={groupId + nanoid()}>
            <Title level={3} style={{ fontSize: '16px' }}>
              {groupName}
              <div>{components.map(c => getComponent(c))}</div>
            </Title>
          </div>
        )
      })}
    </>
  )
}
