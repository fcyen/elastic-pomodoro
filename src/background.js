/**
 * When the extension icon is clicked, opens a new tab and displays the main page
 */
chrome.action.onClicked.addListener(() => {
    const queryInfo = {
        title: 'Elastic Pomodoro'
    };
    chrome.tabs.query(queryInfo)
        .then((tabs) => {
            if (tabs.length === 0) {
                chrome.tabs.create({url: '../extension/index.html'})
            } else {
                chrome.tabs.update(tabs[0].id, { active: true })
            }
        });
});