import Vue from 'vue';

import '@/stylus/main.styl';
import popup from '@/vue/popup.vue';

chrome.tabs.query(
  {
    active: true,
    currentWindow: true,
  },
  (tabs) => {
    chrome.tabs.sendMessage(
      tabs[0].id,
      {
        checkSelection: true,
      },
      (response) => {
        console.log('Get response');
        console.log(response);
        if (response.hasSelection) {
          window.close();
        }

        window._vm = new Vue({
          render: h => h(popup),
        }).$mount('#app');
      },
    );
  },
);
