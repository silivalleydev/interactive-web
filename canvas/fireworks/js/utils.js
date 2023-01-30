/**
 * 최소값과 최대값 사이의 랜덤한 값을 주는 함수
 */
export const randomNumBetween = (min, max) => {
  return Math.random() * (max - min + 1) + min;
};

export const hypotenuse = (x, y) => {
  return Math.sqrt(Math.pow(x, 2) + Math.pow(y, 2));
};
