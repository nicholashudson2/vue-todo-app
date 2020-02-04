import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate';
import dayjs from 'dayjs';
import Vuex from 'vuex';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Vue.use(Vuex);
Object.defineProperty(Vue.prototype, '$dayjs', { value: dayjs });

Vue.config.productionTip = false;

Vue.filter('incomplete', function (array) {
  return array.filter(element => !element.completed);
});

const store = new Vuex.Store({
  state: {
    createTask: false,
    currentTask: {},
    tasks: []
  },
  mutations: {
    addTask: (state, payload) => {
      state.tasks.push(payload.newTask);
    },
    removeTask: (state, payload) => {
      state.tasks.filter((value, index) => {
        if (
          value.taskName == payload.task.taskName &&
          value.taskDescription == payload.task.taskDescription
        ) {
          state.tasks.splice(index, 1);
        }
      });
    },
    setCreateTask: (state, payload) => state.createTask = payload.createTask,
    setCurrentTask: (state, payload) => state.currentTask = payload.currentTask
  },
  actions: {
    submitTask: (context, payload) => {
      if (context.state.currentTask != null) {
        context.commit('removeTask', { task: context.state.currentTask });
        context.commit('addTask', { newTask: payload.newTask });
      } else {
        context.commit('addTask', { newTask: payload.newTask });
      }
      context.dispatch('finishCreateTask');
    },
    beginCreateTask: context => {
      context.commit('setCreateTask', { createTask: true })
    },
    finishCreateTask: context => {
      context.commit('setCreateTask', { createTask: false })
      context.commit('setCurrentTask', {});
    }
  }
})

new Vue({
  render: h => h(App),
  store
}).$mount('#app')
