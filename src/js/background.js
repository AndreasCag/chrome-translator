import translate from '@/js/workers/translate';
import googleTranslateParser from '@/js/workers/googleTranslateParser';

async function sendTranslation(request, sendResponse) {
  try {
    const data = await translate(
      'en',
      'ru',
      request.string,
    );
    const result = googleTranslateParser(data);
    console.log('send response');
    console.log(result);
    sendResponse(result);
  }
  catch (err) {
    console.log('Error on translation');
    console.log(err);
    sendResponse({ err });
  }
}

chrome.runtime.onMessage.addListener(
  (request, sender, sendResponse) => {
    if (request.getTranslation) {
      sendTranslation(request, sendResponse);
      console.log('Send true for thye sake of async request');
      return true;
    }

    console.log(request);
    throw new Error('Unrecognized type of request.');
  },
);
