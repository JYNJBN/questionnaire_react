import { QuestionTitle } from './QuestionTitle'
import { QuestionTitleDefaultProps } from './Interface'
import { PropComponent } from './PropComponent'

export * from './Interface'
export default {
  title: '输入框',
  type: 'questionTitle',
  Component: QuestionTitle,
  defaultProps: QuestionTitleDefaultProps,
  PropComponent: PropComponent,
}
