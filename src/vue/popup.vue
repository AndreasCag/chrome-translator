<template lang="pug">
  .popup.flex(
    ref="popup"
    :style="popupWidth && popupHeight ? `width: ${popupWidth}px; height: ${popupHeight}px;` : ''"
    )
    .popup__main-wrapper.flex.flex_row.flex__content
      .popup__resize-left(
        @mousedown="startResize"
        data-type="left"
        )
      .popup__main.flex.flex__content
        t-translator
    .popup__footer
      .popup__resize-left-bottom(
        @mousedown="startResize"
        data-type="left-bottom"
        )
      .popup__resize-bottom(
        @mousedown="startResize"
        data-type="bottom"
        )
</template>

<script>
  import tTranslator from './components/t-translator.vue';

  export default {

    components: {
      tTranslator,
    },

    data() {
      return {
        activeMenu: 'translate',
        screenX: null,
        screenY: null,
        initialWidth: null,
        initialHeight: null,
        type: null,
        popupWidth: Number(localStorage.getItem('popupWidth')) || null,
        popupHeight: Number(localStorage.getItem('popupHeight')) || null,
      };
    },

    methods: {

      resizeTick(event) {
        if (this.type !== 'bottom') {
          this.popupWidth = Math.min(this.initialWidth - (event.screenX - this.screenX), 795);
        }

        if (this.type !== 'left') {
          this.popupHeight = Math.min(this.initialHeight + (event.screenY - this.screenY), 595);
        }
      },

      startResize(event) {
        this.type = event.target.dataset.type;
        this.screenX = event.screenX;
        this.screenY = event.screenY;
        this.initialWidth = this.popupWidth;
        this.initialHeight = this.popupHeight;

        window.document.body.style.cursor = window.getComputedStyle(event.target).cursor;

        window.addEventListener('mousemove', this.resizeTick);
        window.addEventListener('mouseup', () => {
          localStorage.setItem('popupWidth', this.popupWidth);
          localStorage.setItem('popupHeight', this.popupHeight);
          window.removeEventListener('mousemove', this.resizeTick);
        });
      },

    },

    mounted() {
      if (!this.popupWidth) {
        this.popupWidth = this.$refs.popup.clientWidth;
        this.popupHeight = this.$refs.popup.clientHeight;
      }
    },

  };
</script>

<style lang="styl">
  .popup
    display flex
    flex-direction column
    width 350px

    &__main-wrapper
      display flex
      margin-top 8px
      margin-right 8px

    &__footer
      display flex

    &__resize-left
      width 8px
      user-select none
      cursor ew-resize

    &__resize-bottom
      cursor ns-resize
      height 8px
      flex 1 1 auto
      user-select none

    &__resize-left-bottom
      cursor nesw-resize
      width 8px
      user-select none
      height 8px

    &__main
      flex 1 1 auto
</style>
