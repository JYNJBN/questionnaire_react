import { QuestionInputDefaultProps } from './Interface'
import { PropComponent } from './PropComponent'
import { QuestionInput } from './QuestionInput'

export * from './Interface'
export default {
  title: '输入框',
  type: 'questionInput',
  Component: QuestionInput,
  defaultProps: QuestionInputDefaultProps,
  PropComponent: PropComponent,
}
