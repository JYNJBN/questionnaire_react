export type OptionType = {
  label: string
  value: string
}
export type QuestionRadioPropsType = {
  title?: string
  isVertical?: boolean
  options?: OptionType[]
  value?: string
  onChange?: (newProps: Partial<QuestionRadioPropsType>) => void
  disable?: boolean
  isHidden?: boolean
}

export const QuestionRadioDefaultProps: QuestionRadioPropsType = {
  title: '单选标题',
  isVertical: false,
  options: [
    { label: '选项1', value: '1' },
    { label: '选项2', value: '2' },
    { label: '选项3', value: '3' },
  ],
  value: '',
}
// 统计组件的属性类型
export type QuestionRadioStatPropType = {
  stat: Array<{ name: string; count: number }>
}
