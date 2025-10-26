
try{let s2}catch{}
console.log("Script 2 prepared to modify video feed.")




function disableWatch(){
  // secondary = document.getElementById("secondary")

  const v = [secondary]
  for (let i=0; i<v.length;i++){
    if (v[i]){
      v[i].style.visibility = "hidden"
      v[i].style.position = "absolute"
    }
  }

  // primary = document.getElementById("primary")
  if (primary){
    minPrimWitdth = primary.style.minWidth
    primary.style.minWidth = "80vw" 
  }

}

function enableWatch(){

  const v = [secondary]
  for (let i=0; i<v.length;i++){
    if (v[i]){
      v[i].style.visibility = "visible"
      v[i].style.position = ""
    }
  }

  
  primary? (primary.style.minWidth = ""):""

}


function handleSwitch2(){
  chrome.tabs.query({ url: "https://www.youtube.com/watch*" , }, (tabs) => {        
    if (!tabs.length) {
      alert("No se encontró una pestaña con https://www.youtube.com/");
      return;
    }
    
    const isChecked = s2;


    chrome.scripting.executeScript({
      target: { tabId: tabs[0].id },
      func: (checked) => {
        chrome.storage.local.set({s2: checked}).then(() => {
            console.log("Switch2 is set to " + checked);
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

  chrome.storage.local.get(["s2"], function(result) {
      try{switch2.checked = result.s2;}catch{}
      console.log("a"+result.s2)
  });
  
}catch{
  setTimeout(
    ()=>{
    secondary = document.getElementById("secondary")
    primary = document.getElementById("primary")
    chrome.storage.local.get(["s2"], function(result) {
        result.s2 ? disableWatch() : enableWatch()
    });
      
    }, 5000
  )
}

