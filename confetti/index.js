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

function confetti({ x, y, count, deg, colors, shapes, spread }) {
  for (let i = 0; i < count; i++) {
    particles.push(new Particle(x, y, deg, colors, shapes, spread));
  }
}

function render() {
  let now, delta;
  let then = Date.now();

  let deg = 0;

  const frame = () => {
    requestAnimationFrame(frame);
    now = Date.now();
    delta = now - then;
    if (delta < interval) return;
    ctx.clearRect(0, 0, canvasWidth * 3, canvasHeight * 3);
    /**
     * 스쿨 퍼레이드
     */
    // confetti({
    //   x: 0, // 0 ~ 1
    //   y: 1, // 0 ~ 1
    //   count: 10,
    //   deg: -40,
    // });
    // confetti({
    //   x: 1.99, // 0 ~ 1
    //   y: 1, // 0 ~ 1
    //   count: 10,
    //   deg: -140,
    // });

    /**
     * 축하포 퍼레이드
     */
    // confetti({
    //   x: 0, // 0 ~ 1
    //   y: 0, // 0 ~ 1
    //   count: 10,
    //   deg: 45,
    // });
    // confetti({
    //   x: 1.99, // 0 ~ 1
    //   y: 0, // 0 ~ 1
    //   count: 10,
    //   deg: 135,
    // });

    /**
     * 가운데에서 위로
     */
    // confetti({
    //   x: 1, // 0 ~ 1
    //   y: 1, // 0 ~ 1
    //   count: 10,
    //   deg: 270,
    // });

    /**
     * 가운데에서 원으로
     */
    // confetti({
    //   x: 1, // 0 ~ 1
    //   y: 1, // 0 ~ 1
    //   count: 10,
    //   deg: 270,
    //   spread: 180,
    // });

    /**
     * 전체적으로 퍼지는 느낌
     */
    // confetti({
    //   x: Math.random() + 0.5, // 0 ~ 1
    //   y: Math.random() + 0.5, // 0 ~ 1
    //   count: 10,
    //   deg: 270,
    //   spread: 180,
    // });

    /**
     * 콘패티 회전
     */
    deg += 1;

    confetti({
      x: 1, // 0 ~ 1
      y: 1, // 0 ~ 1
      count: 10,
      deg: 225 + deg,
      spread: 1,
    });
    confetti({
      x: 1, // 0 ~ 1
      y: 1, // 0 ~ 1
      count: 10,
      deg: 90 + deg,
      spread: 1,
    });
    confetti({
      x: 1, // 0 ~ 1
      y: 1, // 0 ~ 1
      count: 10,
      deg: 315 + deg,
      spread: 1,
    });

    for (let i = particles.length - 1; i >= 0; i--) {
      particles[i].update();
      particles[i].draw(ctx);

      if (particles[i].opacity < 0) particles.splice(i, 1);
      if (particles[i].y > canvasHeight * 2) particles.splice(i, 1);
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
    x: 0, // 0 ~ 1
    y: 0.5, // 0 ~ 1
    count: 10,
    deg: -50,
    spread: 1,
  });
});
