

export const createDeck = () => {
  const deck = [];
  const elems = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  for (let i = 0; i < 4; i++) {
    deck.push(...elems);
  }
  return deck;
}

export const shuffleDeck = (array) => {
  let counter = array.length;
  while (counter > 0) {
    let randomIdx = Math.floor(Math.random() * counter);
    counter--;
    let tempElem = array[counter];
    array[counter] = array[randomIdx];
    array[randomIdx] = tempElem;
  }
  return array;
}

export const findWinner = (array) => {
  let highestValue = 0;
  let playerIdx;
  for (let i = 0; i < array.length; i += 1) {
    if (array[i] > highestValue) {
      highestValue = array[i];
      playerIdx = i;
    }
  }
  return [playerIdx, highestValue]
}

export const checkForDuplicate = (array) => {
  const cardCount = {};
  const checkCurrCards = [...array];
  let isSameValue = false;
  let dupCardValue;

  checkCurrCards.forEach(card => {
    cardCount[card] = (cardCount[card] || 0) + 1;
  })

  Object.entries(cardCount).forEach(pair => {
    if (pair[1] > 1) {
      isSameValue = true;
      dupCardValue = Number(pair[0]);
    }
  })

  return isSameValue ? dupCardValue : 0
}