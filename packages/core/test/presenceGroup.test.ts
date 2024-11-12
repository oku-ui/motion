import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Motion, PresenceGroup } from '~/index'

const TestComponent = {
  components: { Motion, PresenceGroup },
  props: {
    presenceGroupInitial: {
      type: Boolean,
      default: true,
    },
    show: {
      type: Boolean,
      default: true,
    },
    animate: {
      type: Object,
      default: {},
    },
  },
  // No idea why these are all being cast to objects
  template: `<PresenceGroup :initial="presenceGroupInitial">
  <Motion
    v-for="(item,index) in 4"
    v-show="show"
    :key="item"
    data-testid="child"
    :data-index="index"
    :animate="animate"
    :exit="{ opacity: 0, transition: { duration: 0.5, delay: index *0.15 } }"
  ></Motion>  
</PresenceGroup>`,
}

describe('presenceGroup', () => {
  it('renders element list', async () => {
    const wrapper = mount(TestComponent)
    expect(wrapper.findAll('[data-testid=\'child\']')).toHaveLength(4)
  })

  it('on initial Presence Group render, initial: false applies to children', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        show: true,
        presenceGroupInitial: false,
        animate: { opacity: 0.5 },
      } as any,
    })

    expect(wrapper.html()).toEqual(
            `<transition-group-stub appear="false" persisted="false" css="false">
  <div style="opacity: 0.5;" data-testid="child" data-index="0"></div>
  <div style="opacity: 0.5;" data-testid="child" data-index="1"></div>
  <div style="opacity: 0.5;" data-testid="child" data-index="2"></div>
  <div style="opacity: 0.5;" data-testid="child" data-index="3"></div>
</transition-group-stub>`,
    )
  })

  it('animates element defer out, the last child element should been out in the end', async () => {
    const wrapper = mount(TestComponent, {
      props: {
        show: true,
        animate: { opacity: 0.5 },
      } as any,
    })

    expect(wrapper.find('[data-index=\'3\']').element.getAttribute('style')).toEqual('opacity: 0.5;')

    await wrapper.setProps({
      show: false,
    })

    return new Promise<void>((resolve) => {
      setTimeout(() => {
        expect(wrapper.find('[data-index=\'3\']').element.getAttribute('style')).toEqual('display: none; opacity: 0.5;')
        resolve()
      }, 500)
    })
  })
})
