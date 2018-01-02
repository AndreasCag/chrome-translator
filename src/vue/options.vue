<template lang="pug">
  .flex.flex__content(
    @click="languageMenuOpened = false"
    )
    .flex__header
      .options__navbar.is-link
        img.options__brand(src="~public/svg/language.svg")
        h2.options__brand-name
          | Translator
        .options__lang-container
          .dropdown.is-right(:class="{ 'is-active': languageMenuOpened }")
            .dropdown-trigger(
              @click.stop="languageMenuOpened = !languageMenuOpened"
              )
              .options__lang-dropdown-trigger
                img.options__lang(src="~public/svg/countries/en.svg")
                span.icon.is-small
                  i.material-icons keyboard_arrow_down
            .dropdown-menu.options__lang-dropdown
              .dropdown-content.options__lang-dropdown-content
                img.options__lang(src="~public/svg/countries/en.svg")
                img.options__lang(src="~public/svg/countries/ru.svg")
    .flex__content
      .container.options__container
        .options__settings-header
          | Settings
</template>

<script>
  export default {

    data() {
      return {
        languageMenuOpened: false,
      };
    },

  };
</script>

<style lang="styl">
  body
    height 100vh

  .options
    &__navbar
      display flex
      align-items flex-end
      box-shadow 0px 3px 3px rgba(0, 0, 0, 0.3)

    &__lang-dropdown
      min-width 58px

    &__lang-dropdown-trigger
      display flex
      align-items center
      cursor pointer

    &__lang-dropdown-content
      display flex
      flex-direction column
      align-items center

    &__brand
      width 40px
      height 40px
      margin 16px

    &__brand-name
      font-size 2rem
      margin 16px
      line-height 1
      font-weight 400

    &__container
      padding-top 16px

    &__settings-header
      font-size 1.75rem

    &__lang-container
      margin 0 16px 16px auto

    &__lang
      width 26px
      height 26px
      margin 8px
      cursor pointer
</style>
