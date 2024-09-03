import { QuestionCheckbox } from './Component'
import { QuestionCheckboxDefaultProps } from './Interface'
import { PropComponent } from './PropComponent'
export * from './Interface'
export default {
  title: '单选框',
  type: 'questionCheckbox',
  Component: QuestionCheckbox,
  defaultProps: QuestionCheckboxDefaultProps,
  PropComponent: PropComponent,
}
