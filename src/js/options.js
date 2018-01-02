import Vue from 'vue';
import 'bulma/css/bulma.css';
import 'material-design-icons/iconfont/material-icons.css';

import '@/stylus/main.styl';
import options from '@/vue/options.vue';

window._vm = new Vue({
  render: h => h(options),
}).$mount('#app');
