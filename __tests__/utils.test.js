import { createDeck, shuffleDeck, findWinner, checkForDuplicate } from '../app/utils';

// Overall, these are great functions and great tests
describe('unit tests for utility functions', () => {

  it('createDeck returns an array with length 52', () => {
    const deck = createDeck();
    expect(deck.length).toBe(52);
    expect(deck[0]).toBe(2);
    expect(deck[51]).toBe(14);
  });

  it('shuffleDeck randomizes the order of the input array', () => {
    const input = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
    const shuffled = shuffleDeck(input);
    expect(shuffled.length).toBe(10);
    // shuffled[0] could be one, given that the randomIdx is truly random
    // so this test may fail sometimes
    // you will likely need to mock Math.random in order for this test to not fail periodically
    // In a real application, this might fail mysteriously when the code is deployed
    // Tests should be completely deterministic.  
    expect(shuffled[0]).not.toBe(1);
  });

  it('findWinner returns the index of largest number in an array and the value', () => {
    const input = [8, 10, 14, 6];
    const winner = findWinner(input);
    expect(winner.length).toBe(2);
    expect(winner[0]).toBe(2);
    expect(winner[1]).toBe(14);
  });

/* jest allows you to organize the functions you are testing by nesting describe calls
  for example:

  desicribe("checkForDuplicates", () => {
    it('returns 0 if there are no duplicates in the input array', () => {
      const input = [8, 10, 14, 6];
      const dups = checkForDuplicate(input);
      expect(dups).toBe(0);
    });
  });
*/
  })

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