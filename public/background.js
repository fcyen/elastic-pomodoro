let API = chrome;

API.browserAction.setBadgeBackgroundColor({ color: [255, 0, 0, 255] });
API.browserAction.setBadgeText({text: '55'});

API.browserAction.onClicked.addListener(function(activeTab)
{
    var newURL = "index.html";
    chrome.tabs.create({ url: newURL });
});

API.runtime.onMessage.addListener((message, sender, sendResponse) => {
    API.browserAction.setBadgeText({text: message.time});
    //sendResponse();
});
