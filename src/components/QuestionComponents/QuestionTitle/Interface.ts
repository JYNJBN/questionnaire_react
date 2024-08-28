export type QuestionTitlePropsType = {
  text?: string
  level?: 1 | 2 | 3 | 4 | 5
  isCenter?: boolean
  disable?: boolean
  onChange?: (newProps: Partial<QuestionTitlePropsType>) => void
}
export const QuestionTitleDefaultProps: QuestionTitlePropsType = {
  text: '标题',
  level: 1,
  isCenter: false,
}
