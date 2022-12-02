const Card = (function () {
  function brightness(cursorPositionY, centerPositionY, strength = 50) {
    return 1 - rotate(cursorPositionY, centerPositionY)/strength;
  }

  function rotate(cursorPosition, centerPosition, threshold = 20) {
    if (cursorPosition - centerPosition >= 0) {
      return (cursorPosition - centerPosition) >= threshold ? threshold : (cursorPosition - centerPosition);
    } else {
      return (cursorPosition - centerPosition) <= -threshold ? -threshold : (cursorPosition - centerPosition);
    }
  }

  function addEffect($card) {
    let rect = $card.getBoundingClientRect();
    let centerX = rect.left + rect.width / 2;
    let centerY = rect.top + rect.height / 2;

    window.addEventListener("resize", function (event) {
      rect = $card.getBoundingClientRect();
      centerX = rect.left + rect.width / 2;
      centerY = rect.top + rect.height / 2;
    });

    $card.addEventListener("mousemove", function (event) {
      console.log(`mousemove rotateY(${rotate(event.x, centerX)}deg)`)
      $card.style.transform = `perspective(1000px)
      rotateY(${rotate(event.x, centerX)}deg)
      rotateX(${-rotate(event.y, centerY)}deg)`;
      $card.style.width = `249px`;
      $card.style.height = `436px`;
      $card.style.filter = `brightness(${brightness(event.y, centerY)})`;
      $card.style.boxShadow = `${-rotate(event.x, centerX)}px ${-rotate(event.y, centerY)}px 80px 0px rgba(48, 65, 0, 0.5)`;
    });

    $card.addEventListener("mouseleave", function (event) {
      // $card.style.transform = `perspective(500px)`;
      // $card.style.width = `192px`;
      // $card.style.height = `336px`;
      // $card.style.filter = `brightness(1)`;
      // $card.style.boxShadow = `0 0 0 0 rgba(48, 65, 0, 0.5)`;
      $card.removeAttribute('style');
    });
  }

  function add(imgPath, $wrapper) {
    const $card = document.createElement('div');
    $card.classList.add('card');
    const $img = document.createElement('img');
    $img.src = imgPath;

    addEffect($card);

    $card.append($img);
    $wrapper.append($card);
  }

  return {
    add
  }
})();

window.onload = (function () {
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
    Card.add(`interative-card-img/${el}`, $wrapper);
  })
});
