import { FC } from 'react'
import QuestionInputConf, { QuestionInputPropsType } from './QuestionInput'
import QuestionTitleConf, { QuestionTitlePropsType } from './QuestionTitle'
import QuestionParagraphConf, { QuestionParagraphPropsType } from './QuestionParagraph'
import QuestionInfoConf, { QuestionInfoPropsType } from './QuestionInfo'
import QuestionTextareaConf, { QuestionTextareaPropsType } from './QuestionTextarea'
import QuestionRadioConf, {
  QuestionRadioPropsType,
  QuestionRadioStatPropType,
} from './QuestionRadio'
import QuestionCheckboxConf, {
  QuestionCheckboxPropsType,
  QuestionCheckboxStatPropsType,
} from './QuestionCheckbox'
export type ComponentsPropsType =
  | QuestionInputPropsType
  | QuestionTitlePropsType
  | QuestionParagraphPropsType
  | QuestionInfoPropsType
  | QuestionTextareaPropsType
  | QuestionRadioPropsType
  | QuestionCheckboxPropsType

// 所有的统计组件类型
export type StatComponentType = QuestionRadioStatPropType | QuestionCheckboxStatPropsType

// 组件类型
export type ComponentConfType = {
  title: string
  type: string
  // 组件 这里的泛型用于指定组件接受的props
  Component: FC<ComponentsPropsType>
  PropComponent: FC<ComponentsPropsType>
  defaultProps: ComponentsPropsType
  StatComponent?: FC<StatComponentType>
}

// 全部组件配置的列表
export const componentConfList: ComponentConfType[] = [
  QuestionInputConf,
  QuestionTitleConf,
  QuestionParagraphConf,
  QuestionInfoConf,
  QuestionTextareaConf,
  QuestionRadioConf,
  QuestionCheckboxConf,
]
// 根据类型获取组件配置
export function getComponentConfByType(type: string) {
  return componentConfList.find(conf => conf.type === type)
}
// 组件分组
export const componentConfGroup = [
  {
    groupId: 'textGroup',
    groupName: '文本显示',
    components: [QuestionTitleConf, QuestionParagraphConf, QuestionInfoConf, QuestionTextareaConf],
  },
  {
    groupId: 'inputGroup',
    groupName: '用户输入',
    components: [QuestionInputConf],
  },
  {
    groupId: 'chooseGroup',
    groupName: '用户选择',
    components: [QuestionRadioConf, QuestionCheckboxConf],
  },
]
