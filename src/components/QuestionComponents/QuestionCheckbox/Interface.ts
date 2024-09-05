export type OptionType = {
  label: string
  value: string
  checked: boolean
}
export type QuestionCheckboxPropsType = {
  title?: string
  isVertical?: boolean
  list?: OptionType[]
  onChange?: (newProps: Partial<QuestionCheckboxPropsType>) => void
  disable?: boolean
  isHidden?: boolean
}

export const QuestionCheckboxDefaultProps: QuestionCheckboxPropsType = {
  title: '多选标题',
  isVertical: false,
  list: [
    { label: '选项1', value: '1', checked: false },
    { label: '选项2', value: '2', checked: false },
    { label: '选项3', value: '3', checked: false },
  ],
}

// 统计组件的属性类型
export type QuestionCheckboxStatPropsType = {
  stat: Array<{ name: string; count: number }>
}
