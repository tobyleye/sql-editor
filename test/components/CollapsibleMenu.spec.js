import { mount } from '@vue/test-utils'
import CollapsibleMenu from '@/components/CollapsibleMenu.vue'

describe('CollapsibleMenu component', () => {
  test('renders component', async () => {
    const wrapper = mount(CollapsibleMenu, {
      propsData: {
        label: 'menu',
        defaultIsOpen: false,
      },
      stubs: ['fa'],
    })
    expect(wrapper.text()).toContain('menu')
  })

  test('clicking menu trigger toggles menu', async () => {
    const wrapper = mount(CollapsibleMenu, {
      propsData: {
        label: 'menu',
        defaultIsOpen: false,
      },
      stubs:['fa']
    })
    expect(wrapper.find('.menu-content').exists()).toBe(false)
    await wrapper.find('button').trigger('click')
    expect(wrapper.find('.menu-content').exists()).toBe(true)
  })
})
