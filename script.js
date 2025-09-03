const canvas = document.getElementById('network');
const ctx = canvas.getContext('2d');

let width = canvas.width = window.innerWidth;
let height = canvas.height = window.innerHeight;

class Node {
  constructor() {
    this.x = Math.random() * width;
    this.y = Math.random() * height;
    this.vx = (Math.random() - 0.5) * 0.5;
    this.vy = (Math.random() - 0.5) * 0.5;
    this.radius = 3;
  }
  move() {
    this.x += this.vx;
    this.y += this.vy;
    if(this.x < 0 || this.x > width) this.vx *= -1;
    if(this.y < 0 || this.y > height) this.vy *= -1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI*2);
    ctx.fillStyle = "#00f5ff";
    ctx.shadowColor = "#00f5ff";
    ctx.shadowBlur = 15;
    ctx.fill();
    ctx.shadowBlur = 0;
  }
}

const nodes = Array.from({length:40}, () => new Node());
let pulse = 0;

function drawLines() {
  nodes.forEach((a,i) => {
    nodes.forEach((b,j) => {
      if(i < j){
        const dx = a.x - b.x;
        const dy = a.y - b.y;
        const dist = Math.sqrt(dx*dx + dy*dy);
        if(dist < 180){
          ctx.beginPath();
          ctx.moveTo(a.x, a.y);
          ctx.lineTo(b.x, b.y);
          ctx.strokeStyle = `rgba(0,245,255,${0.15*(180-dist)/180})`;
          ctx.lineWidth = 1;
          ctx.stroke();

          if(Math.random() < 0.005){
            ctx.beginPath();
            ctx.moveTo(a.x, a.y);
            ctx.lineTo(b.x, b.y);
            ctx.strokeStyle = "rgba(0,255,180,0.8)";
            ctx.lineWidth = 2 + Math.sin(pulse)*1.5;
            ctx.shadowColor = "#00ffcc";
            ctx.shadowBlur = 20;
            ctx.stroke();
            ctx.shadowBlur = 0;
          }
        }
      }
    });
  });
}

function animate() {
  ctx.clearRect(0,0,width,height);
  drawLines();
  nodes.forEach(node => {
    node.move();
    node.draw();
  });
  pulse += 0.05;
  requestAnimationFrame(animate);
}

animate();

window.addEventListener('resize', () => {
  width = canvas.width = window.innerWidth;
  height = canvas.height = window.innerHeight;
});
