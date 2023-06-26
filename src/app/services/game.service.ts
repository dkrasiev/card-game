import {Injectable} from '@angular/core';
import {ICard} from "../model/card";
import {DatePipe} from "@angular/common";
import {BehaviorSubject, Observable} from "rxjs";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards: ICard[] = [];
  selectedCards: (ICard | undefined)[] = [];
  time: number = 0;
  interval: any;

  cardsSubject: BehaviorSubject<ICard[]> = new BehaviorSubject<ICard[]>([])
  cardsSubject$: Observable<ICard[]> = this.cardsSubject.asObservable()

  formattedTime: BehaviorSubject<string> = new BehaviorSubject<string>("00:00")
  formattedTime$: Observable<string> = this.formattedTime.asObservable()

  count: BehaviorSubject<number> = new BehaviorSubject<number>(0)
  count$: Observable<number> = this.count.asObservable()

  win: BehaviorSubject<boolean> = new BehaviorSubject<boolean>(false)
  win$: Observable<boolean> = this.win.asObservable()


  constructor(private datePipe: DatePipe) {
    this.selectedCards = [];
    this.cards = this.createCards()
    this.setCardsSubject(this.cards)
  }

   createCards() {
    let res = [];
    for (let i = 0; i < 4; i++) {
      let card: ICard = {
        id: i + 1,
        value: Math.round((i + 1) / 2),
        clicked: false,
        matched:false
      };
      res.push(card);
    }
    return res;
  }

  setCardsSubject(cards: ICard[]) {
    this.cardsSubject.next(cards)
  }

  isWin() {
    if (!this.cards.find(card => card.matched === false)) {
      this.win.next(true)
      clearInterval(this.interval);
    }
  }

  newGame() {

    this.cards = this.cards.sort(() => Math.random() - 0.5);
    this.setCardsSubject(this.cards)
    this.cards = this.cards.map((card) => {
      card.matched = false
      card.clicked = false
      return card
    })
    this.count.next(0)
    this.time = 0;
    this.formattedTime.next("00:00")
    this.interval = setInterval(() => {
      this.time++;
      this.formattedTime.next(<string>this.datePipe.transform(new Date(this.time * 1000), 'mm:ss'));
    }, 1000)
    this.win.next(false)
  }

  handleClick(id: number, value: number) {

    if (
      this.selectedCards.length === 2 ||
      this.selectedCards.find((card) => card?.id === id)
    ) {
      return;
    }

    this.cards = this.cards.map((card: ICard) =>
      card.id === id ? {...card, clicked: true} : card
    );

    if (this.selectedCards.length === 1 && this.selectedCards[0]) {
      this.count.next(this.count.value + 1)
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
          this.setCardsSubject(this.cards)

        }, 500)
        this.selectedCards = [];
      } else {
        this.selectedCards = [card1, card2];
        setTimeout(() => {
          this.cards = this.cards.map((card) =>
            card.id === card1?.id || card.id === card2?.id
              ? {...card, clicked: false}
              : card
          );
          this.selectedCards = [];
          this.setCardsSubject(this.cards)

        }, 1500);
      }
    } else {
      this.selectedCards = [...this.selectedCards, {id, value, clicked: false, matched: false}];
    }
    this.setCardsSubject(this.cards)
  }
}
