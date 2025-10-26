chrome.tabs.onUpdated.addListener(
    (tabId, changeInfo, tabInfo)=>{

        if (changeInfo.status=="complete"){

            console.log("\n New tab added. Let's display its info:")
            console.log(tabInfo)

            if (tabInfo.url=="https://www.youtube.com/"){
                console.log("Running home script.")
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["switch1.js"]
                })
            }else if (tabInfo.url.substring(0,29)=="https://www.youtube.com/watch"){
                console.log("Running watch script.")
                chrome.scripting.executeScript({
                    target: { tabId: tabId },
                    files: ["switch2.js"]
                })
            }

        }
    }
);

