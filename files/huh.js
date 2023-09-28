  if (window.location.href === 'https://tumwater.beaverton.k12.or.us/') {
document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === '>') {
    event.preventDefault(); 
    var iframe = document.createElement('iframe');
    iframe.src = 'https://dingdong-kv4x.onrender.com';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = 9999;
    iframe.style.top = '0';
    iframe.style.right = '0';
    iframe.style.width = '100%'; 
    iframe.style.height = '100%'; 
    document.body.appendChild(iframe);
  }
});
                                                                         document.addEventListener('keydown', function(event) {
  if ((event.ctrlKey || event.metaKey) && event.key === '|') {
    event.preventDefault(); 
    var iframe = document.createElement('iframe');
    iframe.src = 'https://cheese-v29k.onrender.com/~';
    iframe.style.position = 'fixed';
    iframe.style.zIndex = 9999;
    iframe.style.top = '0';
    iframe.style.right = '0';
    iframe.style.width = '100%'; 
    iframe.style.height = '100%'; 
    document.body.appendChild(iframe);
  }
});
  }
