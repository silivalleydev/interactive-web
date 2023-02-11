import Background from "./Background.js";

/**
 * https://itch.io/game-assets
 * 위 주소로가면 다양한 게임을 만들수 있는 에셋 이미지 소스가 있다.
 */
export default class App {
  static canvas = document.querySelector("canvas");
  static ctx = App.canvas.getContext("2d");
  static dpr = devicePixelRatio > 1 ? 2 : 1;
  static interval = 1000 / 60;
  static width = 1024;
  static height = 768;

  constructor() {
    this.backgrounds = [
      new Background({
        img: document.querySelector("#bg3-img"),
        speed: -1,
      }),
      new Background({
        img: document.querySelector("#bg2-img"),
        speed: -2,
      }),
      new Background({
        img: document.querySelector("#bg1-img"),
        speed: -4,
      }),
    ];
    /**
     * bind(this)를 하지 않으면 이벤트 등록의 주체인 window가 주체가된다.
     *
     * bind(this)를 하게되면 현재의 부모인 App 클래스가 this로 바인딩 되게 된다.
     *
     * 클래스가 this로 바인딩 되게 되면 App 클래스 내의 멤버변수나 메서드를 사용할 수 있게된다.
     */
    window.addEventListener("resize", this.resize.bind(this));
  }

  resize() {
    App.canvas.width = App.width * App.dpr;
    App.canvas.height = App.height * App.dpr;
    App.ctx.scale(App.dpr, App.dpr);

    const width =
      innerWidth > innerHeight ? innerHeight * 0.9 : innerWidth * 0.9;

    App.canvas.style.width = width + "px";
    App.canvas.style.height = width * (3 / 4) + "px";
  }

  render() {
    let now, delta;
    let then = Date.now();
    const frame = () => {
      requestAnimationFrame(frame);

      now = Date.now();
      delta = now - delta;
      if (delta < App.interval) return;

      App.ctx.clearRect(0, 0, App.width, App.height);
      App.ctx.fillRect(50, 50, 100, 100);
      this.backgrounds.forEach((background) => {
        background.update();
        background.draw();
      });
      then = now - (delta % App.interval);
    };
    requestAnimationFrame(frame);
  }
}
