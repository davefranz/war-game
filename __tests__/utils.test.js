import { createDeck, shuffleDeck, findWinner, checkForDuplicate } from '../app/utils';
import { mockRandom, resetMockRandom } from 'jest-mock-random';


describe('createDeck function', () => {
  const deck = createDeck();

  it('should return an array with a length of 52', () => {
    expect(Array.isArray(deck)).toBe(true)
    expect(deck.length).toBe(52);
  })

  it('should create an array where every value 2-14 is repeated 4 times', () => {
    const cardCount = deck.reduce((acc, curCard) => {
      acc[curCard] = (acc[curCard] || 0) + 1;
      return acc;
    }, {} );
    const fourOfEveryCard = Object.values(cardCount).every(count => count === 4);
    expect(fourOfEveryCard).toBe(true);
  })
})

// OLD CREATEDECK TESTS
  // it('createDeck returns an array with length 52', () => {
  //   const deck = createDeck();
  //   expect(deck.length).toBe(52);
  //   expect(deck[0]).toBe(2);
  //   expect(deck[51]).toBe(14);
  // });


describe('shuffleDeck function', () => {
  it('should reorder the values in the input array', () => {
    mockRandom([0.01]);
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const shuffled = shuffleDeck(input);
    expect(shuffled[8]).toEqual(10);  
    expect(shuffled[0]).not.toEqual(1);
    expect(shuffled).toEqual(input);
    resetMockRandom();
  })
})

// OLD TEST FOR SHUFFLEDECK
// it('shuffleDeck randomizes the order of the input array', () => {
//   const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
//   const shuffled = shuffleDeck(input);
//   expect(shuffled.length).toBe(10);
//   expect(shuffled[0]).not.toBe(1);
// });

describe('unit tests for utility functions', () => {

  it('findWinner returns the index of largest number in an array and the value', () => {
    const input = [8, 10, 14, 6];
    const winner = findWinner(input);
    expect(winner.length).toBe(2);
    expect(winner[0]).toBe(2);
    expect(winner[1]).toBe(14);
  });

  it('checkForDuplicates returns 0 if there are no duplicates in the input array', () => {
    const input = [8, 10, 14, 6];
    const dups = checkForDuplicate(input);
    expect(dups).toBe(0);
  });

  it('checkForDuplicates returns the value of duplicates in the input array', () => {
    const input = [8, 2, 2, 6];
    const dups = checkForDuplicate(input);
    expect(dups).toBe(2);
  });
})