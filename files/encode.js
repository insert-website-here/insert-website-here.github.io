const c=`background:linear-gradient(to right,#e6e9f0,#eef1f5);padding:10px;border-radius:5px;box-shadow:0 0 10px rgba(0,0,0,0.5);position:fixed;top:50px;left:50px;z-index:99999;`,
h=`<div style='${c}' draggable='true'><h1 style='font-size:20px;text-align:center;'>Base64 Encoder/Decoder</h1><textarea id='input' style='width:100%;height:100px;margin-bottom:10px;'></textarea><textarea id='output' style='width:100%;height:100px;margin-bottom:10px;'></textarea><div style='text-align:center;'><button id='encode' style='background-color:#4CAF50;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin-right:10px;'>Encode</button><button id='decode' style='background-color:#008CBA;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;'>Decode</button><button id='copy' style='background-color:#555555;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin-left:10px;'>Copy Encoded</button></div></div>`;
document.body.insertAdjacentHTML('afterbegin',h);
const b=document.querySelector('div[draggable="true"]'),
  i=(e)=>{isDragging=true,lastX=e.clientX,lastY=e.clientY},
  u=(e)=>{isDragging=false},
  m=(e)=>{
    if(isDragging){
      requestAnimationFrame(()=>{
        deltaX=e.clientX-lastX,deltaY=e.clientY-lastY,boxTop=b.offsetTop+deltaY,boxLeft=b.offsetLeft+deltaX,b.style.top=`${boxTop}px`,b.style.left=`${boxLeft}px`,lastX=e.clientX,lastY=e.clientY
      });
    }
  };
b.addEventListener('mousedown',i);
b.addEventListener('mouseup',u);
b.addEventListener('mousemove',m);
document.getElementById('encode').addEventListener('click',()=>{const e=document.getElementById('input').value;document.getElementById('output').value=btoa(e)});
document.getElementById('decode').addEventListener('click',()=>{const e=document.getElementById('input').value;document.getElementById('output').value=atob(e)});
document.getElementById('copy').addEventListener('click',()=>{const e=document.getElementById('output');e.select(),e.setSelectionRange(0,99999),document.execCommand('copy')});
