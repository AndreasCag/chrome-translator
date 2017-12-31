import translate from './workers/translate';

import '@/stylus/main.styl';

document
  .querySelector('button')
  .addEventListener('click', async () => {
    const result = await translate('dad');
    alert(result);
  });