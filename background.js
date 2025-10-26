

chrome.tabs.onUpdated.addListener(
    ()=>{
        chrome.tabs.query({ url: "https://www.youtube.com/" , status:"complete"}, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["switch1.js"]
            })
        })

        chrome.tabs.query({ url: "https://www.youtube.com/watch*" , status:"complete" }, (tabs) => {
            chrome.scripting.executeScript({
                target: { tabId: tabs[0].id },
                files: ["switch2.js"]
            })
        })
    }
);