class Card {
  constructor(imgPath) {
    this.imgPath = imgPath;

    this.buildElement();
  }

  buildElement() {
    const $card = document.createElement('div');
    $card.classList.add('card');
    const $img = document.createElement('img');
    $img.src = this.imgPath;
    $img.addEventListener('load', this.addEffect.bind(this));

    $card.append($img);

    this.el = $card;
  }

  addEffect() {
    this.defineCenterPosition();

    window.addEventListener("resize", () => {
      this.defineCenterPosition();
    });

    let hover = false;
    let printed = true;

    this.el.addEventListener("mouseover", (event) => {
      hover = true;
      this.defineStyle(event.x, event.y);
    });

    this.el.addEventListener("mousemove", (event) => {
      hover = true;
      if (printed) {
        printed = false;
        requestAnimationFrame(() => {
          if (hover) {
            this.defineStyle(event.offsetX, event.offsetY);
          }
          setTimeout(() => printed = true, 30);
        });
      }
    });

    this.el.addEventListener("mouseleave", () => {
      hover = false;
      this.resetStyle();
    });
  }

  defineCenterPosition() {
    this.centerX = this.el.clientWidth / 2;
    this.centerY = this.el.clientHeight / 2;
  }

  defineStyle(mouseOffsetX, mouseOffsetY) {
    const rotationX = this.rotate(mouseOffsetY, this.centerY, 20);
    const rotationY = this.rotate(mouseOffsetX, this.centerX, 20);
    const brightness = 1 - ((rotationX + rotationY) / 200);

    this.el.style.transform = `perspective(1000px) rotateX(${-rotationX}deg) rotateY(${rotationY}deg)`;
    this.el.style.scale = '1.2';
    this.el.style.filter = `brightness(${brightness})`;
    this.el.style.boxShadow = `${-rotationY}px ${rotationX}px 80px 0px rgba(48, 65, 0, 0.5)`;

    this.el.classList.add('animation');
  }

  resetStyle() {
    this.el.removeAttribute('style');
  }

  rotate(cursorPosition, centerPosition, threshold) {
    let distance = centerPosition - cursorPosition;

    return threshold / centerPosition * distance;
  }
};

function buildCards() {
  const divinationCards = [
    'the-fool.jpg',
    'the-magician.jpg',
    'the-high-priestess.jpg',
    'the-empress.jpg',
    'the-emperor.jpg',
    'the-hierophant.jpg',
    'the-lovers.jpg',
    'the-chariot.jpg',
    'the-strenght.jpg',
    'the-hermit.jpg',
    'wheel-of-fortune.jpg',
    'justice.jpg',
    'the-hanged-man.jpg',
    'death.jpg',
    'temperance.jpg',
    'the-devil.jpg',
    'the-tower.jpg',
    'the-star.jpg',
    'the-moon.jpg',
    'the-sun.jpg',
    'the-judgement.jpg',
    'the-world.jpg',
  ];

  const $wrapper = document.querySelector('.content');

  divinationCards.forEach((el) => {
    const card = new Card(`interative-card-img/${el}`);
    $wrapper.append(card.el);
  })
};

window.onload = buildCards;
