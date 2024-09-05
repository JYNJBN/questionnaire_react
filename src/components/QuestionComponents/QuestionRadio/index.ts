import { QuestionRadio } from './Component'
import { QuestionRadioDefaultProps } from './Interface'
import { PropComponent } from './PropComponent'
import { StatComponent } from './StatComponent'
export * from './Interface'
export default {
  title: '单选框',
  type: 'questionRadio',
  Component: QuestionRadio,
  defaultProps: QuestionRadioDefaultProps,
  PropComponent: PropComponent,
  StatComponent,
}
