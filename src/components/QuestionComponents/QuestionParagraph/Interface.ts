export type QuestionParagraphPropsType = {
  title?: string
  text?: string
  isCenter?: boolean
  disable?: boolean
  onChange?: (newProps: Partial<QuestionParagraphPropsType>) => void
}
export const QuestionParagraphDefaultProps: QuestionParagraphPropsType = {
  text: '一段文本',
  isCenter: false,
}
