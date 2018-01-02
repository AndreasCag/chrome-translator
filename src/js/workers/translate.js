export default async function(from, to, text) {
  const result = await fetch(`https://translate.google.com/translate_a/single?client=gtx&dt=t&dt=bd&dt=rm&hl={navigator.lang}&sl=${from}&tl=${to}&q=${text}`, {
    method: 'GET',
  });
  const data = await result.json();
  return data;
}
