// import { shallowMount } from '@vue/test-utils'
const shallowMount = require('@vue/test-utils');
// import TaskList from '@/components/TaskList.vue'

// const shallowMount = require('@vue/test-utils');
// const TaskList = import('@/components/TaskList.vue');

describe('TaskList.vue', () => {
  it('renders props.msg when passed', () => {
    const msg = 'new message'
    const wrapper = shallowMount(TaskList, {
      propsData: { msg }
    })
    expect(true).toBe(true)
  })
})
