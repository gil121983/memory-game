init();

function init() {
  start();
}

function start() {
  render(data);
}

function render(cardsArray) {
  const gridElement = document.querySelector('.grid');

  cardsArray.forEach(card => {
    const div = document.createElement('div');
    div.className = 'card hidden';
    div.onclick = onCardClick.bind(event, card);

    const img = document.createElement('img');
    img.src = card.src;
    img.setAttribute('style', 'width: 50px');
    
    div.appendChild(img);

    gridElement.appendChild(div);
  });
}

function onCardClick(card, event) {
  event.target.classList.remove('hidden');
}
