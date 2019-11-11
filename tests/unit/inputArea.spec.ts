import { expect } from 'chai'
import { shallowMount, mount } from '@vue/test-utils'
import InputArea from '@/components/InputArea.vue'
const desc = 'r 100 60 80 80'

describe('InputArea.vue', () => {
  it('renders props.desc when passed', () => {
    const wrapper = shallowMount(InputArea, {
      propsData: { desc }
    })
    const vm = wrapper.vm
    console.log(vm)
    expect(wrapper.props('desc')).to.equal(desc)
    const button = wrapper.find('button')
    console.log('=========================================')
    // button.trigger('click')
    // console.log(wrapper.find('#SVGcontainer').html())
    // expect(wrapper.find('#SVGcontainer').html())
    // expect(wrapper.)
    // expect(wrapper.txtChange(desc, ''))
  })

  // it('Mount props.desc', () => {
  //   const wrapper = mount(InputArea)
  //   const txtArea = wrapper.find('textarea')
  //   // txtArea.trigger('change', { 'target': { 'value': desc } })
  //   // console.log(txtArea)
  //   // wrapper.setProps({ desc })
  //   const button = wrapper.find('button')
  //   button.trigger('click')
  //   // console.log(wrapper.find('#SVGcontainer'))
  //   // expect(wrapper.props('desc')).to.equal(desc)
  //   // wrapper.trigger('change')
  // })
})
