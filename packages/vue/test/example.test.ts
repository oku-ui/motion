import { describe, expect, it } from 'vitest'
import { mount } from '@vue/test-utils'
import { Button } from '../src'

const slotText = 'Test content'

describe('button', () => {
  it('alert render', () => {
    const wrapper = mount(Button, {
      slots: {
        default: slotText,
      },
    })

    expect(wrapper.text()).toBe(slotText)
  })

  it('loading', () => {
    const wrapper = mount(Button, {
      props: {
        loading: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })

  it('disabled', () => {
    const wrapper = mount(Button, {
      props: {
        disabled: true,
      },
    })

    expect(wrapper.html()).toMatchSnapshot()
  })
})
