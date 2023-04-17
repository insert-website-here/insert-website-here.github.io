(function () {
  const css = `
    #createButton {position:absolute;top:10px;left:10px;background-color:#4CAF50;color:white;padding:10px;cursor:pointer;border:none;border-radius:5px;}
    .resizable {position:absolute;background-color:#f1f1f1;border:1px solid #000;cursor:move;z-index:10;}
    .resizable iframe {display:block;width:100%;height:100%;border:none;}
    .resizer {width:10px;height:10px;position:absolute;right:0;bottom:0;background-color:red;cursor:se-resize;}
    .delete {position:absolute;top:-10px;right:-10px;background-color:red;color:white;padding:5px;cursor:pointer;border:none;border-radius:50%;}`;

  const style = document.createElement('style');
  style.innerHTML = css;
  document.head.appendChild(style);

  const createButton = document.createElement('button');
  createButton.id = 'createButton';
  createButton.innerText = 'Create Window';
  document.body.appendChild(createButton);

  createButton.addEventListener('click', createIframe);

  function createIframe() {
    const resizable = document.createElement('div');
    resizable.className = 'resizable';

    const url = prompt('Enter URL:, add https:// or no work');
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
})();
