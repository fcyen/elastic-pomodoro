/**
 * When the extension icon is clicked, opens a new tab and displays the main page
 */
chrome.action.onClicked.addListener(() => {
    chrome.tabs.create({url: '../extension/index.html'});
});