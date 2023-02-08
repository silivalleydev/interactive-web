import Particle from "./js/Particle.js";

const canvas = document.querySelector("canvas");
const ctx = canvas.getContext("2d");
const dpr = window.devicePixelRatio > 1 ? 2 : 1;

let canvasWidth = innerWidth;
let canvasHeight = innerHeight;

const interval = 1000 / 60;

const particles = [];

function init() {
  canvasWidth = innerWidth;
  canvasHeight = innerHeight;
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;
  ctx.scale(dpr, dpr);

  confetti({
    x: canvasWidth / 2,
    y: canvasHeight / 2,
    count: 10,
  });
}

function confetti({ x, y, count, deg }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg));
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  //   const x = innerWidth / 2;
  //   let y = innerHeight / 2;
  //   let widthAlpha = 0;

  //   const width = 50;
  //   const height = 50;
  //   let deg = 0.1;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth, canvasHeight);

    // widthAlpha += 0.1;
    // deg += 0.1;
    // y += 1;

    // ctx.translate(x + width, y + height);
    // ctx.rotate(deg);
    // ctx.translate(-x - width, -y - height);

    // ctx.fillStyle = "red";
    // ctx.fillRect(
    //   x,
    //   y,
    //   width * Math.cos(widthAlpha),
    //   height * Math.sin(widthAlpha)
    // );
    // // ctx.fillRect(x, y, width, height);

    // ctx.resetTransform();

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);
    }

    then = now - (delta % interval);
  };

  requestAnimationFrame(frame);
}

window.addEventListener("load", () => {
  init();
  render();
});

window.addEventListener("resize", init);
window.addEventListener("click", () => {
  confetti({
    x: 0,
    y: canvasHeight / 2,
    count: 10,
    deg: -50,
  });
});
