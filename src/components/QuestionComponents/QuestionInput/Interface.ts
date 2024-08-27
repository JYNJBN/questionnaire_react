export type QuestionInputPropsType = {
  title?: string
  placeholder?: string
  onChange?: (newProps: Partial<QuestionInputPropsType>) => void
}
export const QuestionInputDefaultProps = {
  title: '输入框标题',
  placeholder: '请输入',
}
