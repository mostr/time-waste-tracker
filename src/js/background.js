var _ = require('lodash');

var sites = {};
var timer;

var storage = chrome.storage.local;
var tabs = chrome.tabs;
var windows = chrome.windows;

storage.get('sites', (data) => {
  _.extend(sites, data.sites);
});

tabs.onActivated.addListener(() => {
  isFacebook(startRecording, stopRecording);
});

tabs.onUpdated.addListener((tabId, changeInfo) => {
  changeInfo.url ? isFacebook(startRecording, stopRecording) : null;
});

tabs.onRemoved.addListener((tabId, removeInfo) => {
  removeInfo.isWindowClosing ? stopRecording() : null;
});

windows.onFocusChanged.addListener((winId) => {
  winId === windows.WINDOW_ID_NONE ? stopRecording() : isFacebook(startRecording, stopRecording);
});

function startRecording() {
  timer && clearInterval(timer);
  timer = setInterval(() => {
    sites['facebook'] = (sites['facebook'] || 0) + 1;
  }, 1000);
}

function stopRecording() {
  timer && clearInterval(timer);
  timer = null;
  storage.set({ sites: sites });
}

function isFacebook(foundCb, notFoundCb) {
  notFoundCb = notFoundCb || function () {};
  return tabs.query({ active: true, currentWindow: true, url: '*://www.facebook.com/*' }, function (tabs) {
    tabs.length > 0 ? foundCb(tabs) : notFoundCb();
  })
}

