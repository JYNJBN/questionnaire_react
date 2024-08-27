import React, { Children, FC } from 'react'
import { Tabs } from 'antd'
import { FileTextOutlined, SettingOutlined } from '@ant-design/icons'
import { icons } from 'antd/es/image/PreviewGroup'
import { ComponentLib } from './ComponentLib'
import { Layers } from './Layers'
import { ComponentProp } from './ComponentProp'

export const RightPanel: FC = () => {
  const tabItems = [
    {
      key: 'componentLib',
      label: '属性',
      icon: <FileTextOutlined />,
      children: <ComponentProp />,
    },
    {
      key: 'layers',
      label: '页面设计',
      icon: <SettingOutlined />,
      children: <Layers />,
    },
  ]
  return <Tabs defaultActiveKey="componentLib" items={tabItems}></Tabs>
}
