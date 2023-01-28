// const canvasWidth = 300;
// const canvasHeight = 300;
/**
 * innerWidth, innerHeight는 전체화면 길이로 초기화하는것
 */
const canvasWidth = innerWidth;
const canvasHeight = innerHeight;

const { ctx, canvas } = initialCanvasSetting();
class Particle {
  // particle의 x값, y값, 반지름 값을 constructor로 받는다
  constructor(x, y, radius, speedY = 1) {
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.speedY = speedY;
  }

  update() {
    /**
     * 업데이트시 speedY의 값만큼 움직이도록 처리
     * 랜덤한 속도로 더 빠르게 내려오도록 speedY를 추가
     */
    this.y += this.speedY;
  }

  draw() {
    /**
     * path를 그리기 시작한다고 알리는 메서드
     */
    ctx.beginPath();

    /**
     * arc
     * 1. 시작하는 x위치
     * 2. 시작하는 y위치
     * 3. 반지름의 길이
     * 4. 시작하는 각도
     * 5. 끝나는 각도
     * 6. 시계방향인지 반시계방향인지 넣어줘야함
     *
     * ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 360);
     * 0에서 360도 까지의 각도를 설정해줬는데,
     * Math.PI로 계산하여 설정한이유는
     * Math.PI는 원주와 지름의 비율 3.14159를 나태내는데,
     * 이를 180도로 나눠야 각도가 1도가 되기 때문이다
     */
    ctx.arc(this.x, this.y, this.radius, 0, (Math.PI / 180) * 360);
    ctx.fillStyle = "orange"; // fillStyle에 색상을 넣어주면 채워지는 색상을 바꿀 수 있다.
    ctx.fill(); // fill 메서드는 원형 안에 색상을 채워준다
    //   ctx.stroke(); // stroke 메서드는 원형을 실선 원으로 바꿔준다.
    ctx.closePath(); // 그리는 것을 끝내면 원형이 나오게된다.

    //   ctx.arc(100, 100, 50, 0, (Math.PI / 180) * 180); <- 만약 360도가 아닌 180도를 넣어주면 반원이 그려진다.
  }
}

const x = 100;
const y = 100;
const radius = 50;
// 이렇게 클래스를 사용함으로서 간단하게 여러개의 원을 그릴 수 있게된다.
const particle = new Particle(x, y, radius);
const TOTAL = 20; // 파티클의 갯수를 정해준다.

/**
 *
 * 최소값과 최대값 사이의 랜덤한 값을 주는 함수
 */
const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

let particles = [];

/**
 * 랜덤한 파티클을 생성하기 위한 for문
 */
for (let i = 0; i < TOTAL; i++) {
  const x = randomNumBetween(0, canvasWidth); // 캔버스 전체화면 사이에 랜덤한 x 좌표를 받음
  const y = randomNumBetween(0, canvasHeight); // 캔버스 전체화면 사이에 랜덤한 y 좌표를 받음
  const radius = randomNumBetween(50, 100); // 랜덤한 반지름 길이를 받음
  const speedY = randomNumBetween(1, 5); // 랜덤하게 더 빠른속도로 내려오도록 하는 값
  const particle = new Particle(x, y, radius, speedY); // 랜덤한 수에 따른 파티클을 생성
  particles.push(particle); // 파티클 배열에 넣어줌
}

/**
 * 60FPS로 동일하게 실행되게하기위한코드 -1
 */
const interval = 1000 / 60; // 60FPS를 타겟으로 모든 모니터의 애니메이션이 속도가 같게 하고싶은경우
let now, delta;
let then = Date.now();

// particle 클래스의 draw메서드를 사용하여 원을 그림
// particle.draw();
animate(); // 이 함수를 실행하면 애니메이션이 지속적으로 실행된다.
/**
 * 애니메이션의 원리는
 *
 * 한프레임마다 움직이는 동작을 만들어 일정한 속도로 연속적으로 보여주는 원리
 */
function animate() {
  /**
   * x와 y좌표를 옆으로 한프레임 한프레임 옮기고 싶을때
   * 즉 한프레임 한프레임 움직이도록 실행할 때 사용하는 것이 requestAnimationFrame
   * requestAnimationFrame에 animate 함수를 넣어줘 매 프레임마다 animate 함수를 실행할 수 있도록 한다.
   *
   * 모니터는 보통 144Hz 또는 60Hz의 주사율을 가지고 있다.
   * 모니터에서 주사율 1Hz는 1초에 화면이 한번 그려진다는 의미이다.
   * 따라서 게이밍 모니터 또는 보통 모니터는 144, 사무용 모니터는 60의 주사율을 가지고있는데,
   *
   * requestAnimationFrame에서는 모니터의 주사율 환경에 따라 1초에 144번 또는 60번 animate 함수가 실행된다고 보면된다.
   *
   *
   */
  window.requestAnimationFrame(animate);

  /**
   * 60FPS로 동일하게 실행되게하기위한코드 -2
   * ctx.clearRect로 애니메이션그리기 전 if문 처리
   */
  now = Date.now();
  delta = now - then;

  if (delta < interval) return;

  /**
   * 이전 프레임을 지우고 새로운 프레임을 다시 그리기위해 사용하는 메서드 clearRect
   * 1. 시작하는 x위치
   * 2. 시작하는 y위치
   * 3. 시작하는 가로길이
   * 4. 시작하는 세로길이
   *
   * ctx.clearRect(0, 0, canvasWidth, canvasHeight);
   * 0, 0 위치에서 부터 캔버스 전체길이를 지워주면
   * 매 프레임마다 애니메이션을 지우고 다시 그리고를 반복 할 수 있게된다.
   */
  ctx.clearRect(0, 0, canvasWidth, canvasHeight);

  /**
   * 만약 여기서 x를 1px씩 옮기는 애니메이션을 실행한다고 했을때
   * 만약 주사율이 144인 모니터(게이밍 모니터)에서는 1초에 144px만큼 움직일 것이고,
   * 주사율이 60인 모니터(사무용 모니터)에서는 1초에 60px만큼 움직이게된다.
   *
   * 그렇다면 주사율이 서로 다른 모니터에서 동일한 속도로 이동하게 하고싶다면 어떻게해야할까?
   *
   * 그때 알아야할 개념이 fps이다.
   * fps란 frame per second로 초당 프레임 횟수를 의미하는데,
   * 캔버스에서는 requestAnimationFrame이 몇번 실행되는가를 의미한다.
   */
  // 파티클을 아래로 1씩 움직이게 하는것
  // particle.y += 1;

  particles.forEach((particle) => {
    particle.update();
    particle.draw();

    /**
     * 파티클이 완전히 전체화면에서 아래로 떨어졌을때 다시 맨위로 올리도록 처리하는 구문
     *
     * particle.y - particle.radius
     * <-- 파티클이 완전히 바닥으로 사라졌을때로 처리하려면
     * 파티클의 반지름 만큼 더 내려가야하기 때문에 y값에 원의 반지름 만큼 빼준것
     *
     */
    if (particle.y - particle.radius > canvasHeight) {
      /**
       * 파티클이 시작하는 시점을 -particle.radius
       * 원의 반지름의 음수지점에서 시작하는 이유는 자연스럽게 연출하기 위해선
       * 원의 반지름의 길이만큼 더 위에서 시작해서 자연스럽게 내려오기 때문이다.
       */
      particle.y = -particle.radius;

      /**
       * 완전히 파티클이 바닥에 내려갔을 때 랜덤한 x위치, 랜덤한 원크기 랜덤한 가속도로 다시 실행시키기 위한 구문
       */
      particle.x = randomNumBetween(0, canvasWidth);
      particle.radius = randomNumBetween(50, 100);
      particle.speedY = randomNumBetween(1, 5);
    }
  });

  /**
   * 60FPS로 동일하게 실행되게하기위한코드 -3
   */
  then = now - (delta % interval);
}

/**
 * 캔버스 최초 세팅
 */
function initialCanvasSetting() {
  const canvas = document.querySelector("canvas");

  console.log(canvas);

  /**
   * canvas element의 getContext를 이용하여
   * 캔버스에 그리는 도구를 가져올 수 있다.
   *
   * 그중 아래 내용은 2d 그림을 그리기위한 도구를 가져오는 구문이다.
   *
   * ctx 변수에 2d 그림을 그릴 도구들을 담아주는 것이다.
   */
  const ctx = canvas.getContext("2d");
  console.log(ctx);
  // devicePixelRatio는 화면에 1픽셀당 몇개의 네모칸을 사용하는지 알려주는 프로퍼티이다.
  // devicePixelRatio는 1이면 1픽셀에 1칸을 사용하고 2이면 1픽셀에 2칸씩 총 4칸을 사용하게된다.
  // devicePixelRatio의 값이 클수록 더욱 선명한 화질을 제공하게된다.
  console.log(window.devicePixelRatio);
  const dpr = window.devicePixelRatio;

  /**
   * 보통은 캔버스의 크기를 처음에 아래와같이 지정해놓고 시작한다
   *
   * style width와 canvas 자체의 width가 같게하도록 설정
   * style height와 canvas 자체의 height가 같게하도록 설정
   */
  canvas.style.width = canvasWidth + "px";
  canvas.style.height = canvasHeight + "px";

  /**
   * dpr을 캔버스 기본 width, height에 곱해주는 이유는
   * 디스플레이의 기능에 맞게 화질을 높이기 위해서
   */
  canvas.width = canvasWidth * dpr;
  canvas.height = canvasHeight * dpr;

  /**
   * 캔버스 2d 도구를 통해 scale 메서드를 사용해 dpr값들을 넣어주면 더욱 선명한 화질을 제공할 수 있다.
   */
  ctx.scale(dpr, dpr);

  /**
   * fillRect 함수는 사각형을 그리는 함수로
   * x좌표, y좌표, 사각형 가로길이, 사각형 세로길이가 들어간다.
   */
  //   ctx.fillRect(10, 10, 50, 50);

  return {
    canvas,
    ctx,
  };
}
