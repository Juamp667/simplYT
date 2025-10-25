function handleUpdated(tabId, changeInfo, tabInfo) {
    chrome.tabs.query({ url: "https://www.youtube.com/" , }, (tabs) => {
        chrome.scripting.executeScript({
            target: { tabId: tabs[0].id },
            files: ["switch1.js", "switch2.js"]
        })
    })
}

chrome.tabs.onUpdated.addListener(
    ()=>{setTimeout(handleUpdated, 5 * 1000)}
);