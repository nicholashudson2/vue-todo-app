import Vue from 'vue'
import TaskList from '../components/TaskList.vue'

function getRenderedText(Component, propsData) {
  const Constructor = Vue.extend(Component)
  const vm = new Constructor({ propsData: propsData }).$mount()
  return vm.$el.textContent
}

describe('TaskList', () => {
  it('renders correctly with different props', () => {
    expect(getRenderedText(TaskList, {
      msg: undefined
    })).toBe(undefined)
  })
})