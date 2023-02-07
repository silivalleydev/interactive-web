import { randomNumBetween } from "./util.js";

export default class Particle {
  constructor() {
    this.r = innerHeight / 4;
    this.angle = randomNumBetween(0, 360);

    /**
     * 중심점을 맞추는 것
     */
    this.x = innerWidth / 2 + this.r * Math.cos((Math.PI / 180) * this.angle);
    this.y = innerHeight / 2 + this.r * Math.sin((Math.PI / 180) * this.angle);
  }
  update() {}
  draw(ctx) {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 1, 0, Math.PI * 2);
    ctx.fillStyle = "#fff";
    ctx.fill();
    ctx.closePath();
  }
}
