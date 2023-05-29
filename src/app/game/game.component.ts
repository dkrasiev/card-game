import {Component, OnInit} from '@angular/core';
import {ICard} from '../model/card';
import {DatePipe} from "@angular/common";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent implements OnInit {
  cards: ICard[] = [
    {id: 1, value: 1, clicked: false, matched: false},
    {id: 2, value: 1, clicked: false, matched: false},
    {id: 3, value: 2, clicked: false, matched: false},
    {id: 4, value: 2, clicked: false, matched: false},
    {id: 5, value: 3, clicked: false, matched: false},
    {id: 6, value: 3, clicked: false, matched: false},
    {id: 7, value: 4, clicked: false, matched: false},
    {id: 8, value: 4, clicked: false, matched: false},
    {id: 9, value: 5, clicked: false, matched: false},
    {id: 10, value: 5, clicked: false, matched: false},
    {id: 11, value: 6, clicked: false, matched: false},
    {id: 12, value: 6, clicked: false, matched: false},
    {id: 13, value: 7, clicked: false, matched: false},
    {id: 14, value: 7, clicked: false, matched: false},
    {id: 15, value: 8, clicked: false, matched: false},
    {id: 16, value: 8, clicked: false, matched: false},
    {id: 17, value: 9, clicked: false, matched: false},
    {id: 18, value: 9, clicked: false, matched: false},
    {id: 20, value: 10, clicked: false, matched: false},
    {id: 19, value: 10, clicked: false, matched: false},
    {id: 21, value: 11, clicked: false, matched: false},
    {id: 22, value: 11, clicked: false, matched: false},
    {id: 23, value: 12, clicked: false, matched: false},
    {id: 24, value: 12, clicked: false, matched: false},
    {id: 25, value: 13, clicked: false, matched: false},
    {id: 26, value: 13, clicked: false, matched: false},
    {id: 27, value: 14, clicked: false, matched: false},
    {id: 28, value: 14, clicked: false, matched: false},
    {id: 29, value: 15, clicked: false, matched: false},
    {id: 30, value: 15, clicked: false, matched: false},
    {id: 31, value: 16, clicked: false, matched: false},
    {id: 32, value: 16, clicked: false, matched: false},
    {id: 33, value: 17, clicked: false, matched: false},
    {id: 34, value: 17, clicked: false, matched: false},
    {id: 35, value: 18, clicked: false, matched: false},
    {id: 36, value: 18, clicked: false, matched: false},
  ];
  selectedCards: ICard[] = [];
  win: boolean = false;
  count: number = 0;
  time: number = 0;
  interval: any;
  formattedTime: string | null;

  constructor(private datePipe: DatePipe) {
    this.selectedCards = [];
    this.formattedTime = "00:00"
  }

  isWin() {
    if (!this.cards.find(card => card.matched === false)) {
      this.win = true
      clearInterval(this.interval);
    }
  }

  startGame() {
    this.newGame();
  }
  ngOnInit() {
  }
  ngOnDestroy() {
    clearInterval(this.interval);
  }

  newGame() {
    this.cards= this.cards.map((card) => {
      card.matched = false
      card.clicked = false
      return card
    })
    this.cards = this.cards.sort(() => Math.random() - 0.5);
    this.count = 0;
    this.time = 0;
    this.formattedTime = "00:00"
    this.interval = setInterval(() => {
      this.time++;
      this.formattedTime = this.datePipe.transform(new Date(this.time * 1000), 'mm:ss');
    }, 1000)
    this.win = false
  }

  handleClick(id: number, value: number) {
    if (
      this.selectedCards?.length === 2 ||
      this.selectedCards?.find((card) => card.id === id)
    ) {
      return;
    }

    this.count += 1;

    console.log(this.count);

    this.cards = this.cards.map((card: ICard) =>
      card.id === id ? {...card, clicked: true} : card
    );

    if (this.selectedCards.length === 1) {
      const card1: ICard = this.selectedCards[0];
      const card2: ICard | undefined = this.cards.find(
        (card: ICard): boolean => card.id === id
      );

      if (card1.value == card2?.value) {
        setTimeout(() => {
          this.cards = this.cards.map((card) =>
            card.value === card1.value ? {...card, matched: true} : card
          );
          this.isWin()

        }, 500)
        this.selectedCards = [];
      } else {
        // @ts-ignore
        this.selectedCards = [card1, card2];
        setTimeout(() => {
          this.cards = this.cards.map((card) =>
            card.id === card1.id || card.id === card2?.id
              ? {...card, clicked: false}
              : card
          );
          this.selectedCards = [];
        }, 1500);
      }
    } else {
      // @ts-ignore
      this.selectedCards = [...this.selectedCards, {id, value}];
    }


    console.log(this.cards);
  }
}
