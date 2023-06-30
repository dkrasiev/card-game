import {Injectable} from '@angular/core';
import {ICard} from "../model/card";
import {Game} from "../model/Game";
import {TimeService} from "./time.service";
import {CountService} from "./count.service";

@Injectable({
  providedIn: 'root',
})
export class GameService {
  cards: ICard[] = [];
  win: boolean = false
  game!: Game


  constructor(private timeService: TimeService, private countService: CountService) {
    this.game = new Game()
    this.cards = this.game.cards
  }

  newGame() {
    this.game = new Game()
    this.countService.resetCount()
    this.cards = this.game.cards
    this.game.cardsSubject$.subscribe(value => this.cards = value)

    this.game.win$.subscribe(value => {
      this.win = value
      if(value) {
        this.timeService.clearTimeInterval()
      }
    })
  }

  cardClick(id: number, value: number) {
    this.game.handleClick(id, value);
    if(this.game.isStep) {
      this.countService.step()
    }
  }

}
