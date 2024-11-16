import CStyled from './demo/Styled.vue'
import Demo1 from './demo/Demo1.vue'
import ExitComponent from './demo/ExitComponent.vue'

import UseAnimate from './demo/UseAnimate.vue'

export default { title: 'Components', excludeStories: ['RECOMMENDED_CSS__LABEL__ROOT'] }

export function Styled() {
  return CStyled
}

export function Demo() {
  return Demo1
}

export function ExitC() {
  return ExitComponent
}

export function UseAnimate1() {
  return UseAnimate
}
