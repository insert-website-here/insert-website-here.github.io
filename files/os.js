(function(){
  const styles="#createButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;}#executeButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;}.resizable{position:absolute;background-color:#f1f1f1;border:1px solid #000;cursor:move;z-index:10;}.resizable iframe{display:block;width:100%;height:100%;border:none;}.resizer{width:10px;height:10px;position:absolute;right:0;bottom:0;background-color:red;cursor:se-resize;}.delete{position:absolute;top:-10px;right:-10px;background-color:red;color:white;padding:5px;cursor:pointer;border:none;border-radius:50%;}#toggleControlPanel{position:fixed;top:10px;left:10px;background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;opacity:0;width:0;height:0;overflow:hidden;}.bookmarks-panel{position:fixed;top:10px;right:10px;display:flex;flex-direction:column;gap:10px;visibility:hidden;background:linear-gradient(to bottom right, #4CAF50, #008CBA);padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.5);}.bookmark{display:flex;align-items:center;justify-content:space-between;background-color:#f1f1f1;padding:10px;border-radius:5px;margin-bottom:10px;}.bookmark:hover{background-color:#ddd;}.bookmark button{background-color:#4CAF50;color:white;padding:5px 10px;cursor:pointer;border:none;border-radius:5px;margin-right:10px;}.bookmark span{font-size:16px;font-weight:bold;flex-grow:1;text-align:center;}#bookmarkButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;margin-top:10px;}",
  styleElement=document.createElement("style");
  styleElement.innerHTML=styles;
  document.head.appendChild(styleElement);

  const controlPanel=document.createElement("div");
  controlPanel.style="position:fixed;top:10px;right:10px;display:flex;flex-direction:column;gap:10px;visibility:hidden;background:linear-gradient(to bottom right, #4CAF50, #008CBA);padding:20px;border-radius:10px;box-shadow:0 0 10px rgba(0,0,0,0.5);";
  document.body.appendChild(controlPanel);

  const createButton=document.createElement("button");
  createButton.id="createButton";
  createButton.innerText="Create Window";
  controlPanel.appendChild(createButton);

  const executeButton=document.createElement("button");
  executeButton.id="executeButton";
  executeButton.innerText="Execute Encoder";
  controlPanel.appendChild(executeButton);

  const bookmarksButton=document.createElement("button");
  bookmarksButton.id="bookmarkButton";
  bookmarksButton.innerText="Bookmarks";
  controlPanel.appendChild(bookmarksButton);

  const toggleControlPanelButton=document.createElement("button");
  toggleControlPanelButton.id="toggleControlPanel";
  toggleControlPanelButton.innerText="Toggle Control Panel";
  document.body.appendChild(toggleControlPanelButton);

  const bookmarksPanel=document.createElement("div");
  bookmarksPanel.className="bookmarks-panel";
  document.body.appendChild(bookmarksPanel);

  const bookmarksDiv=document.createElement("div");
  bookmarksDiv.id="bookmarks";
  bookmarksPanel.appendChild(bookmarksDiv);

  createButton.addEventListener("click",()=>{
    const url=prompt("Enter URL: (remember to add https://)");
    if(!url)return;
    const resizable=document.createElement("div");
    resizable.className="resizable";
    const iframe=document.createElement("iframe");
    iframe.src=url;
    resizable.appendChild(iframe);
    const deleteButton=document.createElement("button");
    deleteButton.className="delete";
    deleteButton.innerHTML="&times;";
    resizable.appendChild(deleteButton);
    document.body.appendChild(resizable);
    makeDraggable(resizable);
    makeDeletable(resizable,deleteButton);
  });

  executeButton.addEventListener("click",()=>{
    const script=document.createElement("script");
    script.src="https://insert-website-here.github.io/files/encode.js";
    script.async=true;
    document.head.appendChild(script);
  });

  bookmarksButton.addEventListener("click",()=>{
    bookmarksPanel.style.visibility=bookmarksPanel.style.visibility==="hidden"?"visible":"hidden";
  });

  toggleControlPanelButton.addEventListener("click",()=>{
    controlPanel.style.visibility=controlPanel.style.visibility==="hidden"?"visible":"hidden";
    bookmarksPanel.style.visibility="hidden";
  });

  function makeDraggable(resizable){
    const dragHandle=document.createElement("div");
    dragHandle.style="width:100%;height:20px;background-color:transparent;cursor:move;";
    resizable.insertBefore(dragHandle,resizable.firstChild);
    dragHandle.addEventListener("mousedown",event=>{
      event.preventDefault();
      const iframe=resizable.querySelector("iframe"),
      startX=event.clientX-resizable.offsetLeft,
      startY=event.clientY-resizable.offsetTop;
      const makeMouseMove=event=>{
        resizable.style.left=event.clientX-startX+"px";
        resizable.style.top=event.clientY-startY+"px";
      };
      const makeMouseUp=()=>{
        document.removeEventListener("mousemove",makeMouseMove);
        document.removeEventListener("mouseup",makeMouseUp);
      };
      document.addEventListener("mousemove",makeMouseMove);
      document.addEventListener("mouseup",makeMouseUp);
    });
  }

  function makeDeletable(resizable,deleteButton){
    deleteButton.addEventListener("click",()=>{
      resizable.remove();
    });
  }

  function addBookmark(url){
    const bookmark=document.createElement("div");
    bookmark.className="bookmark";
    const bookmarkUrl=document.createElement("span");
    bookmarkUrl.innerText=url;
    bookmark.appendChild(bookmarkUrl);
    const openButton=document.createElement("button");
    openButton.innerText="Open";
    openButton.addEventListener("click",()=>{
      const resizable=document.createElement("div");
      resizable.className="resizable";
      const iframe=document.createElement("iframe");
      iframe.src=url;
      resizable.appendChild(iframe);
      const deleteButton=document.createElement("button");
      deleteButton.className="delete";
      deleteButton.innerHTML="&times;";
      resizable.appendChild(deleteButton);
      document.body.appendChild(resizable);
      makeDraggable(resizable);
      makeDeletable(resizable,deleteButton);
      bookmarksPanel.style.visibility="hidden";
    });
    bookmark.appendChild(openButton);
    bookmarksDiv.appendChild(bookmark);
  }

  const addBookmarkButton=document.createElement("button");
  addBookmarkButton.innerText="Add Bookmark";
  bookmarksPanel.insertBefore(addBookmarkButton,bookmarksDiv);
  addBookmarkButton.addEventListener("click",()=>{
    const url=prompt("Enter URL for bookmark: (remember to add https://)");
    if(!url)return;
    addBookmark(url);
  });
})();
