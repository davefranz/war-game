

export const createDeck = () => {
  const deck = [];
  const cardValues = [2, 3, 4, 5, 6, 7, 8, 9, 10, 11, 12, 13, 14];
  for (let i = 0; i < 4; i++) {
    deck.push(...cardValues);
  }
  return deck;
}

export const shuffleDeck = (deck) => {
  let deckLength = deck.length;
  while (deckLength > 0) {
    let randomIdx = Math.floor(Math.random() * deckLength);
    deckLength--;
    let tempElem = deck[deckLength];
    deck[deckLength] = deck[randomIdx];
    deck[randomIdx] = tempElem;
  }
  return deck;
}

export const findWinner = (cardsPlayed) => {
  let highestValue = 0;
  let playerIdx;
  for (let i = 0; i < cardsPlayed.length; i += 1) {
    if (cardsPlayed[i] > highestValue) {
      highestValue = cardsPlayed[i];
      playerIdx = i;
    }
  }
  return [playerIdx, highestValue]
}

export const checkForDuplicate = (cardsPlayed) => {
  const cardCount = {};
  const checkCurrCards = [...cardsPlayed];
  let dupCardValue = 0;

  checkCurrCards.forEach(card => {
    cardCount[card] = (cardCount[card] || 0) + 1;
  })

  Object.entries(cardCount).forEach(([card, count]) => {
    if (count > 1) dupCardValue = Number(card);
  })

  return dupCardValue;
}