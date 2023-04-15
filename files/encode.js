javascript:const css=`
background:linear-gradient(to right,#e6e9f0,#eef1f5);
padding:10px;
border-radius:5px;
box-shadow:0 0 10px rgba(0,0,0,0.5);
position:fixed;
top:50px;
left:50px;
z-index:99999;
`;
const html=`
<div style='${css}' draggable='true'>
  <h1 style='font-size:20px;text-align:center;'>Base64 Encoder/Decoder</h1>
  <textarea id='input' style='width:100%;height:100px;margin-bottom:10px;'></textarea>
  <textarea id='output' style='width:100%;height:100px;margin-bottom:10px;'></textarea>
  <div style='text-align:center;'>
    <button id='encode' style='background-color:#4CAF50;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin-right:10px;'>Encode</button>
    <button id='decode' style='background-color:#008CBA;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin-right:10px;'>Decode</button>
    <button id='copy' style='background-color:#555555;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;margin-right:10px;'>Copy Encoded</button>
    <button id='delete' style='background-color:#f44336;border:none;color:white;padding:10px 20px;text-align:center;text-decoration:none;display:inline-block;font-size:16px;'>Delete</button>
  </div>
</div>
`;
document.body.insertAdjacentHTML('afterbegin',html);

const box=document.querySelector('div[draggable="true"]');
let isDragging=false;
let lastX,lastY;

box.addEventListener('mousedown',(e)=>{
  isDragging=true;
  lastX=e.clientX;
  lastY=e.clientY;
});

box.addEventListener('mouseup',()=>{
  isDragging=false;
});

box.addEventListener('mousemove',(e)=>{
  if(isDragging){
    const deltaX=e.clientX-lastX;
    const deltaY=e.clientY-lastY;
    const boxTop=box.offsetTop+deltaY;
    const boxLeft=box.offsetLeft+deltaX;
    box.style.top=`${boxTop}px`;
    box.style.left=`${boxLeft}px`;
    lastX=e.clientX;
    lastY=e.clientY;
  }
});

const encodeButton=document.getElementById('encode');
const decodeButton=document.getElementById('decode');
const copyButton=document.getElementById('copy');
const deleteButton=document.getElementById('delete');

encodeButton.addEventListener('click',()=>{
  const input=document.getElementById('input').value;
  const output=btoa(input);
  document.getElementById('output').value=output;
});

decodeButton.addEventListener('click',()=>{
  const input=document.getElementById('input').value;
  const output=atob(input);
  document.getElementById('output').value=output;
});

copyButton.addEventListener('click',()=>{
  const output=document.getElementById('output');
  output.select();
  output.setSelectionRange(0,99999);
  document.execCommand('copy');
});

deleteButton.addEventListener('click',()=>{
  box.remove();
});
