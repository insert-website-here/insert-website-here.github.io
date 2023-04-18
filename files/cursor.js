const canvas = document.createElement('canvas');
const ctx = canvas.getContext('2d');
let particles = [];

function Particle(x, y) {
  this.x = x;
  this.y = y;
  this.vx = Math.random() * 10 - 5;
  this.vy = Math.random() * 10 - 5;
  this.color = '#' + Math.floor(Math.random() * 16777215).toString(16);
  this.size = Math.random() * 10 + 5;
  this.alpha = 1;
}

Particle.prototype.draw = function() {
  ctx.globalAlpha = this.alpha;
  ctx.fillStyle = this.color;
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
};

function draw() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles.forEach(function(particle) {
    particle.draw();
    particle.x += particle.vx;
    particle.y += particle.vy;
    particle.alpha -= 0.01;
  });
  particles = particles.filter(function(particle) {
    return particle.alpha > 0;
  });
  requestAnimationFrame(draw);
}

canvas.style.position = 'fixed';
canvas.style.top = '0';
canvas.style.left = '0';
canvas.style.zIndex = '-1';
canvas.style.pointerEvents = 'none';

document.body.appendChild(canvas);

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener('resize', function() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

document.addEventListener('mousemove', function(event) {
  for (let i = 0; i < 5; i++) {
    particles.push(new Particle(event.clientX, event.clientY));
  }
});

document.addEventListener('click', function(event) {
  for (let i = 0; i < 50; i++) {
    particles.push(new Particle(event.clientX, event.clientY));
  }
});

draw();
