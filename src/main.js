import Vue from 'vue'
import App from './App.vue'
import { BootstrapVue } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'
import Vuelidate from 'vuelidate';
import dayjs from 'dayjs';

Vue.use(BootstrapVue);
Vue.use(Vuelidate);
Object.defineProperty(Vue.prototype, '$dayjs', { value: dayjs });

Vue.config.productionTip = false;

Vue.filter('incomplete', function (array) {
  return array.filter(element => !element.completed);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
