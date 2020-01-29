import Vue from 'vue'
import App from './App.vue'
import VueAutosuggest from 'vue-autosuggest'
import { BootstrapVue, IconsPlugin } from 'bootstrap-vue'
import 'bootstrap/dist/css/bootstrap.css'
import 'bootstrap-vue/dist/bootstrap-vue.css'

// Install BootstrapVue
Vue.use(BootstrapVue)
// Optionally install the BootstrapVue icon components plugin
Vue.use(IconsPlugin)

Vue.use(VueAutosuggest);
Vue.config.productionTip = false;

Vue.filter('incomplete', function (array) {
  return array.filter(element => !element.completed);
});

new Vue({
  render: h => h(App),
}).$mount('#app')
