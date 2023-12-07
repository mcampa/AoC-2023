const fs = require("fs");

const cardValues = ["2", "3", "4", "5", "6", "7", "8", "9", "T", "J", "Q", "K", "A"];

const FIVE_OF_A_KIND = "FIVE_OF_A_KIND";
const FOUR_OF_A_KIND = "FOUR_OF_A_KIND";
const FULL_HOUSE = "FULL_HOUSE";
const THREE_OF_A_KIND = "THREE_OF_A_KIND";
const TWO_PAIR = "TWO_PAIR";
const ONE_PAIR = "ONE_PAIR";
const HIGH_CARD = "HIGH_CARD";

const weights = [HIGH_CARD, ONE_PAIR, TWO_PAIR, THREE_OF_A_KIND, FULL_HOUSE, FOUR_OF_A_KIND, FIVE_OF_A_KIND];

const cardPatternToHandType = {
  11111: HIGH_CARD,
  2111: ONE_PAIR,
  221: TWO_PAIR,
  311: THREE_OF_A_KIND,
  32: FULL_HOUSE,
  41: FOUR_OF_A_KIND,
  5: FIVE_OF_A_KIND,
};

function solution() {
  const document = fs
    .readFileSync(`${__dirname}/input.txt`, "utf8")
    .split("\n");

  const hands = [];

  for (line of document) {
    const [handCards, bid] = line.split(/\s+/);
    const hand = handCards
      .split("")
      .map((card) => cardValues.indexOf(card) + 2);
    const cardCounts = hand.reduce((acc, card) => {
      acc[card] = acc[card] ? acc[card] + 1 : 1;
      return acc;
    }, {});

    const cardPattern = Object.values(cardCounts)
      .sort((a, b) => b - a)
      .join("");

    hands.push({
      hand,
      bid: Number(bid),
      handType: cardPatternToHandType[cardPattern],
      weights: weights.indexOf(cardPatternToHandType[cardPattern]),
    });
  }

  hands.sort((a, b) => {
    if (a.handType === b.handType) {
      for (let i = 0; i < a.hand.length; i++) {
        if (a.hand[i] !== b.hand[i]) {
          return b.hand[i] - a.hand[i];
        }
      }
    }
    return b.weights - a.weights;
  });

  return hands.reverse().reduce((result, hand, index) => {
    const rank = index + 1;
    return result + hand.bid * rank;
  }, 0);
}

console.log(solution());
