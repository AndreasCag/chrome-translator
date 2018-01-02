if (!window.__translateExt) {
  window.__translateExt = {};
  console.log('Hello from injected script!');

  chrome.runtime.sendMessage({greeting: "hello"}, function(response) {
    console.log(response.farewell);
  });
}
