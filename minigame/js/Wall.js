import App from "./App.js";
import BoundingBox from "./BoundingBox.js";
import { randomNumBetween } from "./util.js";

export default class Wall {
  constructor(config) {
    this.img = document.querySelector("#wall-img");
    this.type = config.type; // 'BIG', 'SMALL'

    switch (this.type) {
      case "BIG":
        this.sizeX = 18 / 30;
        this.sx = this.img.width * (9 / 30);
        break;
      case "SMALL":
        this.sizeX = 9 / 30;
        this.sx = this.img.width * (0 / 30);
        break;

      default:
        break;
    }

    this.width = App.height * this.sizeX;
    this.height = App.height;

    this.gapY = randomNumBetween(App.height * 0.2, App.height * 0.3);
    this.x = App.width;
    // -this.height
    // App.height - this.gapY - this.height
    this.y1 = -this.height + randomNumBetween(30, App.height - this.gapY - 30);
    this.y2 = this.y1 + this.height + this.gapY;

    this.generatedNext = false;
    this.gapNextX = App.width * randomNumBetween(0.65, 0.75);

    this.boundingBox1 = new BoundingBox(
      this.x + 30,
      this.y1 - 23,
      this.width - 60,
      this.height
    );
    this.boundingBox2 = new BoundingBox(
      this.x + 30,
      this.y2 + 23,
      this.width - 60,
      this.height
    );
  }

  get isOutside() {
    return this.x + this.width < 0;
  }
  get canGenerateNext() {
    return !this.generatedNext && this.x + this.width < this.gapNextX;
  }

  isColliding(target) {
    return (
      this.boundingBox1.isColliding(target) ||
      this.boundingBox1.isColliding(target)
    );
  }

  update() {
    this.x += -6;
    this.boundingBox1.x = this.x;
    this.boundingBox2.x = this.x;
  }
  draw() {
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y1,
      this.width,
      this.height
    );
    App.ctx.drawImage(
      this.img,
      this.sx,
      0,
      this.img.width * this.sizeX,
      this.img.height,
      this.x,
      this.y2,
      this.width,
      this.height
    );
    this.boundingBox1.draw();
    this.boundingBox2.draw();
  }
}
