// Cursor
const cursor = document.getElementById('cursor');
document.addEventListener('mousemove', e => {
  cursor.style.left = (e.clientX - 8) + 'px';
  cursor.style.top = (e.clientY - 8) + 'px';
});

// Barcode
const bc = document.getElementById('barcode');
const widths = [2,1,3,1,2,1,1,2,3,1,2,1,3,2,1,2,1,3,1,1,2,1,3,2];
widths.forEach(w => {
  const bar = document.createElement('div');
  bar.className = 'bar';
  bar.style.width = w + 'px';
  bc.appendChild(bar);
});

// PATTERN CANVAS
const canvas = document.getElementById('patternCanvas');
const ctx = canvas.getContext('2d');

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight - 32;
}
resize();
window.addEventListener('resize', () => { resize(); });

const RED = '#ff1a1a';
const DARK = '#3d0000';
const BG = '#0a0000';

// Cell types matching the image pattern
const TYPES = ['cross', 'dot_grid', 'x_pattern', 'speaker', 'lines', 'dots', 'empty', 'checker', 'diagonal'];

function drawCell(ctx, x, y, size, type, alpha) {
  ctx.save();
  ctx.globalAlpha = alpha;
  ctx.strokeStyle = RED;
  ctx.fillStyle = RED;
  ctx.lineWidth = 1;

  const cx = x + size/2;
  const cy = y + size/2;
  const s = size - 2;

  switch(type) {
    case 'cross':
      // X cross
      ctx.beginPath();
      ctx.moveTo(x+2, y+2); ctx.lineTo(x+s, y+s);
      ctx.moveTo(x+s, y+2); ctx.lineTo(x+2, y+s);
      ctx.stroke();
      break;
    case 'dot_grid':
      // 3x3 dots
      for(let r=0;r<3;r++) for(let c=0;c<3;c++){
        ctx.beginPath();
        ctx.arc(x + (c+0.5)*size/3, y + (r+0.5)*size/3, 1.5, 0, Math.PI*2);
        ctx.fill();
      }
      break;
    case 'x_pattern':
      // filled block with X
      ctx.fillStyle = DARK;
      ctx.fillRect(x+1,y+1,s,s);
      ctx.fillStyle = RED;
      ctx.strokeStyle = RED;
      ctx.lineWidth = 1.5;
      ctx.beginPath();
      ctx.moveTo(x+3,y+3); ctx.lineTo(x+s-1,y+s-1);
      ctx.moveTo(x+s-1,y+3); ctx.lineTo(x+3,y+s-1);
      ctx.stroke();
      break;
    case 'speaker':
      // concentric circles (speaker)
      ctx.strokeStyle = RED;
      for(let r=2;r<size/2-1;r+=3){
        ctx.beginPath();
        ctx.arc(cx, cy, r, 0, Math.PI*2);
        ctx.stroke();
      }
      ctx.beginPath();
      ctx.arc(cx,cy,2,0,Math.PI*2);
      ctx.fill();
      break;
    case 'lines':
      // horizontal lines
      ctx.lineWidth = 1;
      for(let l=3;l<size-2;l+=3){
        ctx.beginPath();
        ctx.moveTo(x+2, y+l); ctx.lineTo(x+s, y+l);
        ctx.stroke();
      }
      break;
    case 'dots':
      // single dot center
      ctx.beginPath();
      ctx.arc(cx, cy, 3, 0, Math.PI*2);
      ctx.fill();
      break;
    case 'checker':
      // small checker
      const cs = size/4;
      for(let r=0;r<4;r++) for(let c=0;c<4;c++){
        if((r+c)%2===0){
          ctx.fillRect(x+c*cs, y+r*cs, cs, cs);
        }
      }
      break;
    case 'diagonal':
      // diagonal lines
      ctx.lineWidth = 1;
      for(let d=-size;d<size*2;d+=4){
        ctx.beginPath();
        ctx.moveTo(x+d, y); ctx.lineTo(x+d+size, y+size);
        ctx.stroke();
      }
      break;
    case 'empty':
    default:
      break;
  }
  ctx.restore();
}

// Build a grid map
const CELL = 24;
let cols, rows, grid;
let time = 0;

function buildGrid() {
  cols = Math.ceil(canvas.width / CELL) + 1;
  rows = Math.ceil(canvas.height / CELL) + 1;
  grid = [];
  for(let r=0;r<rows;r++){
    grid[r] = [];
    for(let c=0;c<cols;c++){
      const n = Math.random();
      if(n < 0.08) grid[r][c] = 'speaker';
      else if(n < 0.22) grid[r][c] = 'x_pattern';
      else if(n < 0.38) grid[r][c] = 'cross';
      else if(n < 0.52) grid[r][c] = 'dot_grid';
      else if(n < 0.62) grid[r][c] = 'checker';
      else if(n < 0.70) grid[r][c] = 'lines';
      else if(n < 0.78) grid[r][c] = 'diagonal';
      else if(n < 0.84) grid[r][c] = 'dots';
      else grid[r][c] = 'empty';
    }
  }
}

buildGrid();
window.addEventListener('resize', buildGrid);

// Random cells that "glitch" — periodically flip their type
function glitchGrid() {
  const count = Math.floor(cols * rows * 0.03);
  for(let i=0;i<count;i++){
    const r = Math.floor(Math.random()*rows);
    const c = Math.floor(Math.random()*cols);
    grid[r][c] = TYPES[Math.floor(Math.random()*TYPES.length)];
  }
}

setInterval(glitchGrid, 200);

function draw() {
  ctx.fillStyle = BG;
  ctx.fillRect(0, 0, canvas.width, canvas.height);

  time++;

  for(let r=0;r<rows;r++){
    for(let c=0;c<cols;c++){
      const x = c * CELL;
      const y = r * CELL;
      const type = grid[r][c];

      // Wave alpha based on distance from center + time
      const cx0 = cols/2, cy0 = rows/2;
      const dist = Math.sqrt((c-cx0)**2 + (r-cy0)**2);
      const wave = 0.5 + 0.5 * Math.sin(dist * 0.4 - time * 0.04);
      const alpha = 0.2 + wave * 0.7;

      // Draw subtle grid lines
      ctx.strokeStyle = '#1a0000';
      ctx.lineWidth = 0.5;
      ctx.strokeRect(x, y, CELL, CELL);

      if(type !== 'empty') {
        drawCell(ctx, x, y, CELL, type, alpha);
      }
    }
  }

  requestAnimationFrame(draw);
}

draw();