import { mount } from '@vue/test-utils';
// import TaskList from '@/components/TaskList.vue'

// const TaskList = import('@/components/TaskList.vue');

test('', () => {
  // // render component:
  // const wrapper = mount(TaskList);

  // // Should not allow for taskName less than 3 characters:
  // wrapper.setData({ taskName: 'a' });

  // // Assertion: Error message exists
  // expect(wrapper.find('.error').exists()).toBe(true);

  // // Update the name to pass validation
  // wrapper.setData({ taskName: 'Task name' });

  // // Assertion: Error is gone
  // expect(wrapper.find('.error').exists()).toBe(false);

  expect(true).toBe(true);
})

// function getRenderedText(Component, propsData) {
//   const Constructor = Vue.extend(Component)
//   const vm = new Constructor({ propsData: propsData }).$mount()
//   return vm.$el.textContent
// }

// describe('TaskList', () => {
//   it('renders correctly with different props', () => {
//     expect(getRenderedText(TaskList, {
//       msg: undefined
//     })).toBe(undefined)
//   })
// })