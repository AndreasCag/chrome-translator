import axios from 'axios';

export default async function(text) {
  const result = await axios.get(
    `https://translate.google.com/translate_a/single?client=gtx&dt=t&dt=bd&dt=rm&hl=ru&sl=en&tl=ru&q=${text}`,
  );
  return result;
}
