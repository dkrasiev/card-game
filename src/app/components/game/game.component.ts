import {Component, OnInit} from '@angular/core';
import {ICard} from '../../model/card';
import {DatePipe} from "@angular/common";
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent {
  count: number
  formattedTime: string | null
  cards: ICard[]
  win: boolean

  cardsSubscription: Subscription
  timeSubscription: Subscription
  countSubscription: Subscription
  winSubscription: Subscription

  constructor(public gameService: GameService) {
    this.cardsSubscription = this.gameService.cardsSubject$.subscribe(value => this.cards = value)
    this.timeSubscription = this.gameService.formattedTime.subscribe(value => this.formattedTime = value)
    this.countSubscription = this.gameService.count.subscribe(value => this.count = value)
    this.winSubscription = this.gameService.win.subscribe(value => this.win = value)

  }


}
