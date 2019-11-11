import { expect } from 'chai'
import { shallowMount } from '@vue/test-utils'
import InputArea from '@/components/InputArea.vue'

describe('InputArea.vue', () => {
  it('renders props.msg when passed', () => {
    const desc = 'r 100 60 80 80'
    const wrapper = shallowMount(InputArea, {
      propsData: { desc }
    })
    const vm = wrapper.vm
    console.log(vm)
    expect(wrapper.props('desc')).to.equal(desc)
    const button = wrapper.find('button')
    button.trigger('click')
    console.log(wrapper.find('#SVGcontainer').html())
    // expect(wrapper.find('#SVGcontainer').html())
    // expect(wrapper.)
    // expect(wrapper.txtChange(desc, ''))
  })
})
