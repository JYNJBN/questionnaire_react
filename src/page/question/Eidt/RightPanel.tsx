import React, { Children, FC, useEffect, useState } from 'react'
import { message, Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { ComponentProp } from './ComponentProp'
import { PageSetting } from './PageSetting'
import useGetComponentInfo from '../../../hooks/useGetComponentInfo'
enum TAB_KEYS {
  PROP_KEY = 'prop',
  SETTING_KEY = 'setting',
}
export const RightPanel: FC = () => {
  const [activeKey, setActiveKey] = useState(TAB_KEYS.SETTING_KEY)
  const { currentSelectedId } = useGetComponentInfo()
  useEffect(() => {
    if (currentSelectedId) setActiveKey(TAB_KEYS.PROP_KEY)
    else setActiveKey(TAB_KEYS.SETTING_KEY)
  }, [currentSelectedId])
  const tabItems = [
    {
      key: TAB_KEYS.PROP_KEY,
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      key: TAB_KEYS.SETTING_KEY,
      label: '页面设计',
      icon: <SettingOutlined />,
      children: <PageSetting />,
    },
  ]
  const tabChange = (key: TAB_KEYS) => {
    console.log(key)

    if (!currentSelectedId && key === TAB_KEYS.PROP_KEY) {
      message.warning('请先选择组件')
      return
    }
    setActiveKey(key)
  }
  return (
    <Tabs
      activeKey={activeKey}
      items={tabItems}
      onTabClick={key => tabChange(key as TAB_KEYS)}
    ></Tabs>
  )
}
