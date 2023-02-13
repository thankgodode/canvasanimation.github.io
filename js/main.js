const canvas = document.getElementById("canvas1");
const section1 = document.querySelector("section")
const ctx = canvas.getContext("2d");
let particles_array = [];
let hue = 0;

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

window.addEventListener("resize", function () {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});

const mouse = {
  x: undefined,
  y: undefined,
};

// const rect = canvas.getBoundingClientRect();
// console.log(rect);
section1.addEventListener("mousemove",function(e){
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 10; i++) {
    particles_array.push(new MouseParticles());
  }
})
canvas.addEventListener("mousemove", function (e) {
  mouse.x = e.x;
  mouse.y = e.y;

  for (let i = 0; i < 10; i++) {
    particles_array.push(new MouseParticles());
  }
});

class MouseParticles {
  constructor() {
    this.x = mouse.x;
    this.y = mouse.y;
    this.speedX = Math.random() * 3.5 - 1;
    this.speedY = Math.random() * 3.5 - 1;
    this.size = Math.random() * 8 + 1;
    this.color = "hsl(" + hue + ", 100%, 50%)";
  }
  update() {
    this.x += this.speedX;
    this.y += this.speedY;

    if (this.size > 0.2) this.size -= 0.1;
  }
  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function create_particles() {
  for (let i = 0; i < 10; i++) {
    particles_array.push(new MouseParticles());
  }
}

function particles() {
  for (let i = 0; i < particles_array.length; i++) {
    particles_array[i].update();
    particles_array[i].draw();

    if (particles_array[i].size <= 0.3) {
      particles_array.splice(i, 1);
      i--;
    }
  }
}

function animate() {
  hue += 5;
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  particles();
  requestAnimationFrame(animate);
}

animate();
