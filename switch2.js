
try{let s2}catch{}

function disableWatch(){
  console.log("Disabling video feed.")
  secondary.style.visibility = "hidden"
  secondary.style.position = "absolute"
  minPrimWitdth = primary.style.minWidth
  primary.style.minWidth = "80vw" 
  video_cont.minWidth = "80vw"
}

function enableWatch(){
  console.log("Enabling video feed.")

  secondary.style.visibility = "visible"
  secondary.style.position = ""
  primary.style.minWidth = ""
  video_cont.minWidth = ""

}


function handleSwitch2(){
  chrome.tabs.query({ url: "https://www.youtube.com/watch*" , }, (tabs) => {        
    
    const isChecked = s2;

    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (checked) => {

        chrome.storage.local.set({s2: checked}).then(() => {
            console.log("s2->" + checked);
          });

        checked ? disableWatch() : enableWatch()
      },
      args : [isChecked]
    });
  });
}

try{
  switch2 = document.getElementById("switchRightFeed")
  switch2.addEventListener('change',()=>{
      s2 = switch2.checked
      handleSwitch2()
    })
  chrome.storage.local.get(
    ["s2"], 
    function(result) {switch2.checked = result.s2;}
  );
  
}catch{
    secondary = document.querySelector(".style-scope.ytd-watch-flexy#secondary")
    video_cont = document.querySelector(".ytp-iv-video-content")
    primary = document.querySelector(".style-scope.ytd-watch-flexy#primary")
    chrome.storage.local.get("s2", function(result) {
      result.s2 ? disableWatch() : enableWatch()
    });
  console.log("Script 2 prepared to modify video feed.")
}

