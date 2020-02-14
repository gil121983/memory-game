init();

function init() {
  start();
}

function start() {
  shuffle(deck);
  render(deck);
}

function render(cardsArray) {  
  var gridElement = document.querySelector('.grid');
  const msgLine = document.querySelector('.message-line')

  cardsArray.forEach(card => {
    const div = document.createElement('div');
    div.onclick = onCardClick.bind(event, card);
    if (card.id === "empty-slot")
      div.className = "empty-slot";
    else {
      div.className = 'card hidden';
      const img = document.createElement('img');
      img.src = card.src;
      img.setAttribute('style', 'width: 50px');

      div.appendChild(img);
    }
    gridElement.appendChild(div);
  });

  let pickedCards = [];

  function onCardClick(card, event) {
    if (event.target.classList.contains('hidden') && card.id !== "empty-slot") {
      if (pickedCards.length < 1) {
        event.target.classList.remove('hidden');
        pickedCards.push(card);
      } else {
        event.target.classList.remove('hidden');
        pickedCards.push(card);
        if (pickedCards[0].key !== pickedCards[1].key){         
          msgLine.innerHTML = `<h1>No Match</h1>`;
          setTimeout(()=>flipBack(),3000);
        }else{
          msgLine.innerHTML = `<h1>It's a Match!</h1>`;
          setTimeout(()=>removePair(pickedCards),3000);
        }
      }
    } else {
      msgLine.innerHTML = `<h1>Pick another card!</h1>`;
    }
  }

  function flipBack() {
    clear()
    render(deck)
  }

  function removePair(cards) {
    let cardAindex = cardsArray.findIndex(item =>
      item.id === cards[0].id)
    cardsArray.splice(cardAindex, 1, emptySlot);

    let cardBindex = cardsArray.findIndex(item =>
      item.id === cards[1].id)
    cardsArray.splice(cardBindex, 1, emptySlot);
    
    clear()
    checkForWinner(cardsArray)
    render(cardsArray)
  }

  function checkForWinner(array){
    let count = 0;

    array.forEach(i => {
      if(i.key)
      count += 1;
      if (count ===0){ // change it later to 2 and AUTO FLIP the last pair.
        msgLine.innerHTML = `<h1>You Win !!!</h1>`;
      }       
    })

    
  }
  
  function clear() {
    while (gridElement.firstChild)
      gridElement.removeChild(gridElement.firstChild)
  }
}

function shuffle(array) {
  var currentIndex = array.length, temporaryValue, randomIndex;

  // While there remain elements to shuffle...
  while (0 !== currentIndex) {

    // Pick a remaining element...
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;

    // And swap it with the current element.
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  
  return array;
}
