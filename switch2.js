
let minPrimWitdth

switch2 = document.getElementById("switchRightFeed")
switch2.addEventListener('change',()=>{
    chrome.tabs.query({ url: "https://www.youtube.com/watch*" , }, (tabs) => {
      const isChecked = switch2.checked;
      chrome.scripting.executeScript({
        target: { tabId: tabs[0].id },
        func: (checked) => {
          function disableWatch(){
            secondary = document.getElementById("secondary")

            const v = [secondary]
            for (let i=0; i<v.length;i++){
              if (v[i]){
                v[i].style.visibility = "hidden"
                v[i].style.position = "absolute"
              }
            }

            primary = document.getElementById("primary")
            minPrimWitdth = primary.style.minWidth
            primary.style.minWidth = "80vw" 

          }

          function enableWatch(){
            secondary = document.getElementById("secondary")

            const v = [secondary]
            for (let i=0; i<v.length;i++){
              if (v[i]){
                v[i].style.visibility = "visible"
                v[i].style.position = ""
              }
            }

            primary = document.getElementById("primary")
            primary.style.minWidth = minPrimWitdth

          }

          checked ? disableWatch() : enableWatch()
        },
        args : [isChecked]
      });
    });
})