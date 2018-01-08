/// #if DEBUG
const log = require('loglevel');
/// #else
const log = {
  debug() {},
};
/// #endif

if (!window.__translateExt) {
  window.__translateExt = {};

  chrome.runtime.onMessage.addListener(
    (request, sender, sendResponse) => {
      log.debug('Trasnsaltor get request');
      log.debug(request);
      log.debug(sender);
      if (request.checkSelection) {
        const selection = window.getSelection();
        log.debug('Get selection');
        log.debug(selection);
        if (selection.type === 'Range') {
          sendResponse({ hasSelection: true });


          chrome.runtime.sendMessage(
            {
              getTranslation: true,
              string: selection.toString(),
            },
            (response) => {
              log.debug('get translation response');
              log.debug(response);

              //alert(response.mainTranslate);

              const selectionRect = selection
                .getRangeAt(0)
                .getBoundingClientRect();

              const translationDiv = document.createElement('div');
              translationDiv.innerHTML = `<input style="display: none; width: 100%;" value="${response.mainTranslate}"><span>${response.mainTranslate}</span>`;
              translationDiv.style.backgroundColor = 'white';
              translationDiv.style.position = 'fixed';
              translationDiv.style.left = `${selectionRect.x}px`;
              translationDiv.style.bottom = `${document.documentElement.clientHeight - selectionRect.y}px`;
              translationDiv.style.zIndex = 90000;
              translationDiv.style.lineHeight = 2;
              translationDiv.style.borderRadius = '3px';
              translationDiv.style.padding = '0 4px';
              translationDiv.style.boxShadow = '0px 0px 4px black';
              translationDiv.style.maxWidth = `${selectionRect.width + 100}px`;

              document.body.appendChild(translationDiv);

              setTimeout(
                () => {
                  translationDiv.remove();
                },
                1000,
              );

              translationDiv.addEventListener('click', () => {
                translationDiv.remove();
              });
              translationDiv.addEventListener('contextmenu', (event) => {
                const [input, span] = translationDiv.children;
                input.style.display = 'initial';
                span.style.display = 'none';
                input.select();
                event.preventDefault();
              });
            },
          );

          return;
        }

        sendResponse({ hasSelection: false });
        return;
      }

      throw new Error('Unrecognized type of request');
    },
  );
}

