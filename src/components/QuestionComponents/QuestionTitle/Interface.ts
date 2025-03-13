export type QuestionTitlePropsType = {
  title?: string
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  disable?: boolean
  // onChange是给属性组件使用的去修改属性
  onChange?: (newProps: Partial<QuestionTitlePropsType>) => void
}
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '标题', 
  level: 1,
  isCenter: false,
} 
