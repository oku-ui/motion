import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Motion, Presence } from '~/index'

const TestComponent = {
  components: { Motion, Presence },
  props: {
    presenceInitial: {
      type: Boolean,
      default: true,
      required: false,
    },
    show: {
      type: Boolean,
      default: true,
      required: false,
    },
    animate: {
      type: Object,
      default: {},
      required: false,
    },
    exit: {
      type: Object,
      default: {},
      required: false,
    },
  },
  // No idea why these are all being cast to objects
  template: `<Presence :initial="presenceInitial">
  <Motion
    v-show="show"
    data-testid="child"
    :animate="animate"
    :exit="exit"
  ></Motion>  
</Presence>`,
}

describe('presence', () => {
  it('renders element', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.get('[data-testid=\'child\']').element).toBeTruthy()
  })

  it('on initial Presence render, initial: false applies to children', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        show: true,
        presenceInitial: false,
        animate: { opacity: 0.5 },
      } as any,
    })
    expect(wrapper.html()).toEqual(
            `<transition-stub appear="false" persisted="false" css="false">
  <div style="opacity: 0.5;" data-testid="child"></div>
</transition-stub>`,
    )
  })

  it('animates element out', async () => {
    const exit = { opacity: 0, transition: { duration: 0.001 } }
    const wrapper = mount(TestComponent, {
      props: {
        show: false,
        exit,
      } as any,
    })

    await wrapper.setProps({
      show: false,
      exit,
    })

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(wrapper.get('[data-testid=\'child\']').element.getAttribute('style')).toEqual('display: none;')
        resolve()
      }, 100)
    })
  })
})
