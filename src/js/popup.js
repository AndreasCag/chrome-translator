import Vue from 'vue';

import '@/stylus/main.styl';
import popup from '@/vue/popup.vue';

window._vm = new Vue({
  render: h => h(popup),
}).$mount('#app');
