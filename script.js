const canvas = document.getElementById('canvas1');
const ctx = canvas.getContext('2d');

ctx.canvas.width = window.innerWidth;
ctx.canvas.height = window.innerHeight;

let particleArray = [];

const colors = [
  `rgba(255, 255, 255, 1)`,
  `rgba(255, 255, 255, 0.3)`,
  `rgba(173, 216, 230, 0.8)`,
  `rgba(211, 211, 211, 0.8)`,
];

const maxSize = 40;
const minSize = 0;
const mouseRadius = 60;

// mouse position

let mouse = {
  x: null,
  y: null,
};

window.addEventListener('mousemove', (e) => {
  mouse.x = e.x;
  mouse.y = e.y;
});

//  create constructor function for particle

function Particle(x, y, directionX, directionY, size, color) {
  this.x = x;
  this.y = y;
  this.directionX = directionX;
  this.directionY = directionY;
  this.size = size;
  this.color = color;
}

//  add draw method to Particle prototype

Particle.prototype.draw = function () {
  ctx.beginPath();
  ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2, false);
  ctx.fillStyle = this.color;
  ctx.fill();
};

// add update method to Particle prototype

Particle.prototype.update = function () {
  if (this.x + this.size > canvas.width || this.x - this.size < 0) {
    this.directionX = -this.directionX;
    if (this.x + this.size > canvas.width) {
      this.x = canvas.width - this.size;
    } else {
      this.x = this.size;
    }
  }
  if (this.y + this.size > canvas.height || this.y - this.size < 0) {
    this.directionY = -this.directionY;
    if (this.y + this.size > canvas.height) {
      this.y = canvas.height - this.size;
    } else {
      this.y = this.size;
    }
  }

  this.x += this.directionX;
  this.y += this.directionY;

  //    mouse interactivity

  if (
    mouse.x - this.x < mouseRadius &&
    mouse.x - this.x > -mouseRadius &&
    mouse.y - this.y < mouseRadius &&
    mouse.y - this.y > -mouseRadius
  ) {
    if (this.size < maxSize) {
      this.size += 3;
    }
  } else if (this.size > minSize) {
    this.size -= 0.3;
  }

  if (this.size < 0) {
    this.size = 0;
  }

  this.draw();
};

// create particle array

function init() {
  particleArray = [];
  for (let i = 0; i < 1000; i++) {
    let size = 0;
    let x = Math.random() * (innerWidth - size * 2) + size;
    let y = Math.random() * (innerHeight - size * 2) + size;
    let directionX = Math.random() * 0.2 - 0.1;
    let directionY = Math.random() * 0.2 - 0.1;
    let color = colors[Math.floor(Math.random() * colors.length)];

    particleArray.push(new Particle(x, y, directionX, directionY, size, color));
  }
}

// animation loop

function animate() {
  requestAnimationFrame(animate);
  ctx.clearRect(0, 0, innerWidth, innerHeight);

  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
}

init();
animate();

window.addEventListener('resize', () => {
  canvas.width = innerWidth;
  canvas.height = innerHeight;
  for (let i = 0; i < particleArray.length; i++) {
    particleArray[i].update();
  }
});
