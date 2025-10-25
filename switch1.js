
try{
  let s1
}catch{
  console.log(s1)
}
chrome.storage.local.get(["s1"], function(result) {
    s1 = result.s1
});


function disableHome(){
  console.log("Disabling home.")
  // pg_manager = document.getElementById("page-manager")
  // mini_guide = document.getElementsByTagName("ytd-mini-guide-renderer")[0] 
  // guide = document.getElementById("guide")
  // shorts = document.getElementById("contents-container").children[0]

  const v = [pg_manager, mini_guide, guide, shorts]
  for (let i=0; i<v.length;i++){
    if (v[i]){
      v[i].style.visibility = "hidden"
      v[i].style.position = "absolute"
    }
  }


  // container = document.getElementById("container")
  container_child = container.children 
  for (let i=0; i<container_child.length; i++){
      container_child[i].style.minWidth = "fit-content"
      container_child[i].style.maxHeight = "min-content"
  }
  container.style.cssText = "height:85vh;display:flex; flex-direction:column;justify-content: center;gap: 25px;"


  // start = document.getElementById("start")
  start.style.cssText = "height: auto; width: 20vw;"
  // logo_icon = document.getElementById("logo-icon")
  logo_icon.style.cssText = "height: auto; width: 20vw;"



  // center = document.getElementById("center")
  center.style.cssText = "max-height:100px; min-width:50vw" 

  // search_box = document.getElementsByTagName("yt-searchbox")[0]
  search_box.style.margin = "0" 

  // a = document.getElementsByClassName("ytSearchboxComponentSuggestionsContainerScrollable")[0]
  a.style.maxHeight = "30vh" 
}


function enableHome(){
  console.log("Enabling home.")
  pg_manager = document.getElementById("page-manager")
  mini_guide = document.getElementsByTagName("ytd-mini-guide-renderer")[0] 
  guide = document.getElementById("guide")
  shorts = document.getElementById("contents-container").children[0]
  
  const v = [pg_manager, mini_guide, guide, shorts]
  for (let i=0; i<v.length;i++){
    if (v[i]){
      v[i].style.visibility = "visible"
      v[i].style.position = v[i].id=="guide" ?  "static":""
    }
  }


  container = document.getElementById("container")
  container_child = container.children 
  for (let i=0; i<container_child.length; i++){
      container_child[i].style.minWidth = ""
      container_child[i].style.maxHeight = ""
  }
  container.style.cssText = "height:'';display:''; justify-content: '';gap: '';"

  start = document.getElementById("start")
  start.style.cssText = "height: ''; width: '';"

  logo_icon = document.getElementById("logo-icon")
  logo_icon.style.cssText = "height: ''; width: '';"


  center = document.getElementById("center")
  center.style.cssText = "max-height:''; min-width:''" 
  
  search_box = document.getElementsByTagName("yt-searchbox")[0]
  search_box.style.margin = "" 

  document.getElementsByClassName("ytSearchboxComponentSuggestionsContainerScrollable")[0].style.maxHeight = "80vh" 
}


function handleSwitch1(){
  chrome.tabs.query({ url: "https://www.youtube.com/" , }, (tabs) => {
  if (!tabs.length) {
    alert("No se encontró una pestaña con https://www.youtube.com/");
    return;
  }
  
  const isChecked = s1;

  chrome.scripting.executeScript({
    target: { tabId: tabs[0].id },
    func: (checked) => {


      chrome.storage.local.set({s1: checked}).then(() => {
        console.log("Switch1 is set to "+checked);
      });


      checked ? disableHome() : enableHome()
    },
    args : [isChecked]
  });
});
}


try{
  switch1 = document.getElementById("switchHome")
  switch1.addEventListener('change',()=>{
      s1 = switch1.checked
      handleSwitch1()
    })

  chrome.storage.local.get(["s1"], function(result) {
      try{switch1.checked = result.s1;}catch{}
      console.log(result.s1)
});} 
catch{
  setTimeout(
    ()=>{

      //Elementos home
      pg_manager = document.getElementById("page-manager")
      mini_guide = document.getElementsByTagName("ytd-mini-guide-renderer")[0] 
      guide = document.getElementById("guide")
      shorts = document.getElementById("contents-container").children[0]
      container = document.getElementById("container")
      start = document.getElementById("start")
      logo_icon = document.getElementById("logo-icon")
      center = document.getElementById("center")
      search_box = document.getElementsByTagName("yt-searchbox")[0]
      a = document.getElementsByClassName("ytSearchboxComponentSuggestionsContainerScrollable")[0]

      s1 ? disableHome() : enableHome()
    }, 1000
  )
}