/*
Class deck
Properties: suit, rank and cards
 */

'use strict';

class Card {
  constructor (suit,rank) {
    this.suit = suit;
    this.rank = rank;
  }

  get toString() {
    return this.suit + this.rank;
  }
}

class Deck {
  constructor() {
    this.suits = ['diamond', 'spade', 'club', 'heart'];
    this.rank = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'Q', 'K'];
    this.cards = this.makeDeck();
  }

  makeDeck() {
    let cards = [];
    for (let suit in this.suits) {
      for(let rank in this.rank) {
        cards.push(new Card(this.suits[suit],this.rank[rank]));
      }
    }
    return cards;
  }

  shuffle() {
    if(this.cards.length>0) {
        for (let i = 0; i < this.cards.length; i++) {
            let swapPos = Math.floor((Math.random() * this.cards.length));
            let tmp = this.cards[swapPos];
            this.cards[swapPos] = this.cards[i];
            this.cards[i] = tmp;
        }
    }
  }

  deal() {
    if(this.cards.length > 0) {
        return this.cards.pop();
    }
    return 0;
  }
}

class TestDeck {

  constructor() {
      this.testDeckSize();
      this.testShuffleDeck();
      this.testDealCard();
      this.testUniqueness();
  }

  testDeckSize() {
    let deck = new Deck();
    if(deck.cards.length === 52) {
      console.log('PASS: test for deck size passed');
      return;
    }
    console.log('FAIL: test for deck size failed');
  }

  testShuffleDeck() {
    let deck = new Deck();
    let prevOrder = [ ...deck.cards ];
    deck.shuffle();
    for(let i=0; i<prevOrder.length;i++) {
      if(prevOrder[i].suit !== deck.cards[i].suit || prevOrder[i].rank !== deck.cards[i].rank) {
        console.log('PASS: deck is shuffled');
        return;
      }
    }
    console.log('FAIL: deck is not shuffled');
  }

  testDealCard() {
      let deck = new Deck();
      let counter = 0;
      while(deck.deal()){
        counter++;
      }
      if(counter === 52){
        console.log('PASS: all cards dealt');
        return;
      }
      console.log('FAIL: only ' + counter + ' cards dealt');
  }

    testUniqueness() {
        let deck = new Deck();
        let set = new Set();
        let card = deck.deal();
        while(card){
            set.add(card.toString);
            card = deck.deal();
        }
        if(set.size === 52){
            console.log('PASS: ' + set.size + ' unique cards dealt');
            return;
        }
        console.log('FAIL: ' + set.size + ' unique cards not dealt');
    }

}

new TestDeck();

export default Deck;