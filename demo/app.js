'use strict';

import Deck from '../deck.js';

class DemoApp {
    constructor() {
        this.deck = new Deck();
        this.SUITS = {
            'heart': '♡',
            'diamond': '♢',
            'club': '♣',
            'spade': '♠'
        };
        this.dealtCards = [];
        this.render();
        this.setupListeners();
    }

    render(){
        let deckDiv = document.getElementById('deckofcards');
        deckDiv.innerHTML = '';
        for(let i = 0; i < this.deck.cards.length; i++)
        {
            deckDiv.appendChild(this.getCardUI(this.deck.cards[i]));
        }
    }

    setupListeners() {
        document.getElementById('shuffle').addEventListener('click', () => {
            this.shuffle();
        });
        document.getElementById('cdeal').addEventListener('click', () => {
            this.deal();
        });
    }

    getCardUI(card) {
        let el = document.createElement('div');
        el.className = 'card';
        el.innerHTML = card.rank + '' + this.SUITS[card.suit];
        return el;
    }

    shuffle() {
        if(this.deck.cards.length > 0) {
            this.deck.shuffle();
            this.render();
        }
        else{
            let deckDiv = document.getElementById('deckofcards');
            deckDiv.innerHTML = 'No more cards in deck';
        }
    }

    deal() {
        let card = this.deck.deal(this.deck.cards);
        if(card !== 0) {
            let dealed_card = this.getCardUI(card);
            this.dealtCards.push(card);
            let dealed_card_div = document.getElementById("dealedcard");
            dealed_card_div.innerHTML = '';
            dealed_card_div.appendChild(dealed_card);
            this.render();
            this.renderDealtCards();
        }
        else{
            let deckDiv = document.getElementById('dealedcard');
            deckDiv.innerHTML = 'No more cards to deal';
        }
    }

    renderDealtCards(){
        let deckDiv = document.getElementById('donecards');
        deckDiv.innerHTML = '';
        for(let i = 0; i < this.dealtCards.length; i++)
        {
            deckDiv.appendChild(this.getCardUI(this.dealtCards[i]));
        }
    }
}

new DemoApp();