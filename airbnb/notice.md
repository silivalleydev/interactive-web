### CSS display

#### 요소를 어떻게 배치할지, 자식요소를 어떻게 배치할지

- 바깥쪽

1. block
   - 한 줄을 차지
   - width, height, margin, padding 지정기능
   - `<div>, <h1~6>, <header>`
2. inline
   - 컨텐츠 영역 만큼만 차지
   - width, height 지정 불가능
   - margin 좌우에만 적용
   - padding
     - 시각적 영역: 상하좌우
     - 실제 영역 차지: 좌우
   - `<span>, <a>, <button>`

- 안쪽

1. flex
2. grid
3. table
4. flow-root
5. flow
6. ruby

### DOM

- 웹 '문서'의 '객체 모델' 인터페이스

  - 문서인데, 무슨 태그 안에 무슨 태그 안에 무슨 태그가 있다는 것을 객체로 옮겨 놓은 인터페이스
  - DOM은 자바스크립트로 수정할 수 있는 API를 제공한다.
  - 자바스크립트가 읽고 조작할 수 있는 객체의 형태로 html문서를 바꾼것이 DOM이다.

- document

  - querySelector(cssSelectors): Element
  - getElementById(id): Element
  - addEventListener()

- element
  - setAttribute()
    - setAttribute(name, value)
    - attribute
      - id
      - class
      - disabled 등등

### Event

- 시스템에서 일어나는 사건 또는 발생

  - 클릭하거나
  - 마우스를 누르거나 떼거나
  - 키보드를 누르거나 떼거나
  - 창의 크기를 조정하거나
  - form이 제출되거나
  - 비디오가 재생되거나 멈추거나 끝나거나

- 어떤 이벤트가 일어났을 때 어떤 처리를 하고싶다면 EventListener를 사용한다.

### CSS overflow

- 요소 내부의 컨텐츠들이 요소 외부 컨테이너를 넘어가려고 할 때 어떻게 표시할지 정하는 css 속성
- default는 overflow: visible이다.
- 종류
  - overflow: visible
  - overflow: hidden <- 영역을 넘어가는 것은 숨긴다
  - overflow: clip <- 실험적 기능
  - overflow: scroll <- 영역을 넘어가는 것은 스크롤한다.
  - overflow: auto <- 브라우저가 결정(visible scroll)하게한다
- overflow가 의미있게 동작하려면 컨테이너의 높이를 설정하거나 white-space를 nowrap으로 설정해줘야한다.
