import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'

export type ComponentsPropsType = QuestionInputPropsType & QuestionTitlePropsType

// 组件类型
export type ComponentConfType = {
  title: string
  type: string
  // 组件 这里的泛型用于指定组件接受的props
  Component: FC<ComponentsPropsType>
  PropComponent: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
}

// 全部组件配置的列表
export const componentConfList: ComponentConfType[] = [QuestionInputConf, QuestionTitleConf]
// 根据类型获取组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type)
}
// 组件分组
export const componentConfGroup = [
  { groupId: 'textGroup', groupName: '文本显示', components: [QuestionTitleConf] },
  { groupId: 'inputGroup', groupName: '用户输入', components: [QuestionInputConf] },
]
