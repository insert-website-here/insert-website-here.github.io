(function () {
  const css = `#createButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;}
#executeButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;}
.resizable{position:absolute;background-color:#f1f1f1;border:1px solid #000;cursor:move;z-index:10;}
.resizable iframe{display:block;width:100%;height:100%;border:none;}
.resizer{width:10px;height:10px;position:absolute;right:0;bottom:0;background-color:red;cursor:se-resize;}
.delete{position:absolute;top:-10px;right:-10px;background-color:red;color:white;padding:5px;cursor:pointer;border:none;border-radius:50%;}
#toggleControlPanel{position:fixed;top:10px;left:10px;background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;opacity:0;width:0;height:0;overflow:hidden;}
.bookmark {
  display: flex;
  align-items: center;
  justify-content: space-between;
  background-color: #f1f1f1;
  padding: 10px;
  border-radius: 5px;
  margin-bottom: 10px;
}

.bookmark:hover {
  background-color: #ddd;
}

.bookmark button {
  background-color: #4CAF50;
  color: white;
  padding: 5px 10px;
  cursor: pointer;
  border: none;
  border-radius: 5px;
  margin-right: 10px;
}

.bookmark span {
  font-size: 16px;
  font-weight: bold;
  flex-grow: 1;
  text-align: center;
}

#bookmarkButton{background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;margin-top:10px;}`;

  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  const controlPanel = document.createElement('div');
  controlPanel.style.position = 'fixed';
  controlPanel.style.top = '10px';
  controlPanel.style.right = '10px';
  controlPanel.style.display = 'flex';
  controlPanel.style.flexDirection = 'column';
  controlPanel.style.gap = '10px';
  controlPanel.style.visibility = 'hidden';
  document.body.appendChild(controlPanel);

  const createButton = document.createElement('button');
  createButton.id = 'createButton';
  createButton.innerText = 'Create Window';
  controlPanel.appendChild(createButton);

  const executeButton = document.createElement('button');
  executeButton.id = 'executeButton';
  executeButton.innerText = 'Execute Code';
  controlPanel.appendChild(executeButton);

  const bookmarkButton = document.createElement('button');
  bookmarkButton.id = 'bookmarkButton';
  bookmarkButton.innerText = 'Bookmark';
  controlPanel.appendChild(bookmarkButton);

  const toggleControlPanel = document.createElement('button');
  toggleControlPanel.id = 'toggleControlPanel';
  toggleControlPanel.innerText = 'Toggle Control Panel';
  document.body.appendChild(toggleControlPanel);

  createButton.addEventListener('click', createIframe);
  executeButton.addEventListener('click', executeCode);
  bookmarkButton.addEventListener('click', addBookmark);
  toggleControlPanel.addEventListener('click', toggleVisibility);

  function createIframe() {
    const resizable = document.createElement('div');
    resizable.className = 'resizable';

    const url = prompt('Enter URL: (remember to add https://)');
    if (!url) {
      return;
    }

    const iframe = document.createElement('iframe');
    iframe.src = url;
    resizable.appendChild(iframe);

    const resizer = document.createElement('div');
    resizer.className = 'resizer';
    resizable.appendChild(resizer);

    const deleteButton = document.createElement('button');
    deleteButton.className = 'delete';
    deleteButton.innerHTML = '&times;';
    resizable.appendChild(deleteButton);

    document.body.appendChild(resizable);
    makeResizable(resizable, resizer);
    makeDraggable(resizable);
    makeDeletable(resizable, deleteButton);
  }

  function makeResizable(element, handle) {
    handle.addEventListener('mousedown', onMouseDown);
    function onMouseDown(e) {
      e.preventDefault();
      const iframe = element.querySelector('iframe');
      const offsetX = e.clientX - iframe.offsetWidth;
      const offsetY = e.clientY - iframe.offsetHeight;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      function onMouseMove(e) {
        iframe.style.width = e.clientX - offsetX + 'px';
        iframe.style.height = e.clientY - offsetY + 'px';
      }
      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  }

  function makeDraggable(element) {
    const header = document.createElement('div');
    header.style.width = '100%';
    header.style.height = '20px';
    header.style.backgroundColor = 'transparent';
    header.style.cursor = 'move';
    element.insertBefore(header, element.firstChild);
    header.addEventListener('mousedown', onMouseDown);
    function onMouseDown(e) {
      e.preventDefault();
      const offsetX = e.clientX - element.offsetLeft;
      const offsetY = e.clientY - element.offsetTop;
      document.addEventListener('mousemove', onMouseMove);
      document.addEventListener('mouseup', onMouseUp);
      function onMouseMove(e) {
        element.style.left = e.clientX - offsetX + 'px';
        element.style.top = e.clientY - offsetY + 'px';
      }
      function onMouseUp() {
        document.removeEventListener('mousemove', onMouseMove);
        document.removeEventListener('mouseup', onMouseUp);
      }
    }
  }

  function makeDeletable(element, button) {
    button.addEventListener('click', () => {
      element.remove();
    });
  }

  function executeCode() {
    const script = document.createElement('script');
    script.src = 'https://insert-website-here.github.io/files/encode.js';
    script.async = true;
    document.head.appendChild(script);
  }

  function toggleVisibility() {
    if (controlPanel.style.visibility === 'hidden') {
      controlPanel.style.visibility = 'visible';
    } else {
      controlPanel.style.visibility = 'hidden';
    }
  }

  function addBookmark() {
    const url = prompt('Enter URL for bookmark: (remember to add https://)');
    if (!url) {
      return;
    }

    const bookmark = document.createElement('div');
    bookmark.className = 'bookmark';

    const title = document.createElement('span');
    title.innerText = url;
    bookmark.appendChild(title);

    const openButton = document.createElement('button');
    openButton.innerText = 'Open';
    openButton.addEventListener('click', () => {
      const resizable = document.createElement('div');
      resizable.className = 'resizable';

      const iframe = document.createElement('iframe');
      iframe.src = url;
      resizable.appendChild(iframe);

      const resizer = document.createElement('div');
      resizer.className = 'resizer';
      resizable.appendChild(resizer);

      const deleteButton = document.createElement('button');
      deleteButton.className = 'delete';
      deleteButton.innerHTML = '&times;';
      resizable.appendChild(deleteButton);

      document.body.appendChild(resizable);
      makeResizable(resizable, resizer);
      makeDraggable(resizable);
      makeDeletable(resizable, deleteButton);
    });
    bookmark.appendChild(openButton);

    controlPanel.insertBefore(bookmark, bookmarkButton.nextSibling);
  }
})();
alert("hehehe find the control panel button (in top left corner, not exactly tho)");
