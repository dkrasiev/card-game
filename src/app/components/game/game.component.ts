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
export class GameComponent implements OnInit {
  count: number = 0
  formattedTime: string | null = null
  cards:ICard[] = []
  win: boolean = false

  // @ts-ignore
  cardsSubscription: Subscription = null;
  // @ts-ignore
  timeSubscription: Subscription = null

  // @ts-ignore
  countSubscription: Subscription = null

  // @ts-ignore
  winSubscription: Subscription = null




  constructor(public gameService: GameService) {
    this.cardsSubscription = this.gameService.cardsSubject$.subscribe(value => this.cards = value)
    this.timeSubscription = this.gameService.formattedTime.subscribe(value => this.formattedTime = value)
    this.countSubscription = this.gameService.count.subscribe(value => this.count = value)
    this.winSubscription = this.gameService.win.subscribe(value => this.win = value)

  }


  ngOnInit() {
    this.gameService.newGame()
  }

  handleClick(id: number, value: number) {
    console.log(this)
    this.gameService.handleClick(id, value)
    this.cards = this.gameService.getCards()

  }

  startGame() {
    this.gameService.startGame()
  }

}
