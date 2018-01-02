<template lang="pug">
  .translator.flex.flex__content
    a.translator__settings(
      href="/options.html"
      target="_blank"
      )
      | settings
    .translator__header
      select.translator__language-picker(
        v-model="selectedLanguageFrom"
        )
        option(
          v-for="language in availableLanguagesFrom"
          :value="language.abb"
          )
          | {{ language.name }}
      img.translator__swap-icon(
        @click="swap()"
        src="~public/svg/swap.svg"
        )
      select.translator__language-picker(
        v-model="selectedLanguageTo"
        )
        option(
          v-for="language in availableLanguagesTo"
          :value="language.abb"
          )
          | {{ language.name }}
    .translator__body
      textarea.translator__textarea(
        v-model="text"
        autofocus
        )
      textarea.translator__textarea(
        :value="translatedText"
        disabled
        )
</template>

<script>
  import translate from '@/js/workers/translate';
  import googleTranslateParser from '@/js/workers/googleTranslateParser';

  import filter from 'lodash/filter';
  import concat from 'lodash/concat';
  import debounce from 'lodash/debounce';

  export default {

    data() {
      return {
        selectedLanguageFrom: localStorage.getItem('selectedLanguageFrom') || 'en',
        selectedLanguageTo: localStorage.getItem('selectedLanguageTo') || 'ru',
        text: null,
        translatedText: null,
      };
    },

    computed: {

      availableLanguages() {
        return [
          {
            name: 'English',
            abb: 'en',
          },
          {
            name: 'Russian',
            abb: 'ru',
          },
        ];
      },

      availableLanguagesFrom() {
        return concat(
          {
            name: 'Auto',
            abb: 'at',
          },
          filter(this.availableLanguages, language => (
            language.abb !== this.selectedLanguageTo
          )),
        );
      },

      availableLanguagesTo() {
        return filter(this.availableLanguages, language => (
          language.abb !== this.selectedLanguageFrom
        ));
      },

    },

    methods: {

      swap() {
        if (
          !this.selectedLanguageFrom
          || !this.selectedLanguageTo
          || this.selectedLanguageFrom === 'at'
        ) {
          return;
        }

        const temp = this.selectedLanguageFrom;
        this.selectedLanguageFrom = this.selectedLanguageTo;
        this.selectedLanguageTo = temp;

        this.translate();
      },

      translate: debounce(
        async function() {
          if (
            !this.selectedLanguageFrom
            || !this.selectedLanguageTo
            || !this.text
          ) {
            return;
          }
          const data = await translate(
            this.selectedLanguageFrom,
            this.selectedLanguageTo,
            this.text,
            );
          const translation = googleTranslateParser(data);
          this.translatedText = translation;
        },
        300,
      ),

    },

    watch: {
      text() {
        this.translate();
      },
      selectedLanguageFrom(val) {
        localStorage.setItem('selectedLanguageFrom', val);
      },
      selectedLanguageTo(val) {
        localStorage.setItem('selectedLanguageTo', val);
      },
    },

  };
</script>

<style lang="styl">
  .translator

    &__header
      display flex
      margin-bottom 16px
      flex 0 0 auto

    &__body
      flex 1 1 auto
      display flex
      flex-direction column

    &__swap-icon
      width 1.5rem
      height 1.5rem
      cursor pointer
      flex 0 0 auto

    &__language-picker
      flex 1 0 0

      &:first-child
        margin-right 8px

      &:last-child
        margin-left 8px

    &__textarea
      width 100%
      height 6rem
      resize none
      min-height 100px
      box-sizing border-box
      flex 2 1 0

      &:first-child
        margin-bottom 8px
        flex 1 1 0

    &__settings
      margin-left auto
      display block
      width fit-content
      margin-bottom 4px
</style>
