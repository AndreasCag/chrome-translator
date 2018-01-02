import map from 'lodash/map';

export default function(data) {
  const mainTranslate = data[0][0][0];
  const meanings = map(data[1], meaning => ({
    speechPart: meaning[0],
    variants: meaning[1],
  }));

  return {
    mainTranslate,
    meanings,

    toString() {
      /* eslint-disable prefer-template */
      return mainTranslate
        + '\n\n'
        + map(meanings, meaning => (
          `${meaning.speechPart}:\n\n${map(meaning.variants, (o, i) => `${i}. ${o}`).join('\n')}`
        ))
          .join('\n\n');
      /* eslint-enable prefer-template */
    },
  };
}
