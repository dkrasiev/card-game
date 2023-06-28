import {Injectable} from '@angular/core';
import {ICard} from "../model/card";
import {Game} from "./Game";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards: ICard[] = [];
  count!: number
  time: string = "00:00"
  win: boolean = false

  constructor(private game: Game) {
    this.cards = game.cards
    this.game.cardsSubject$.subscribe(value => this.cards = value)
    this.game.count$.subscribe(value => this.count = value)
    this.game.formattedTime$.subscribe(value => this.time = value)
    this.game.win$.subscribe(value => this.win = value)
  }

  newGame() {
    this.game.newGame()
  }

  cardClick(id: number, value: number) {
    this.game.handleClick(id, value)
  }

}
