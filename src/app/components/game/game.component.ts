import {Component, EventEmitter, Input, Output} from '@angular/core';
import {DatePipe} from "@angular/common";
import {GameService} from "../../services/game.service";
import {ICard} from "../../model/card";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent {
  modalShow: boolean = true
  winModalShow:boolean = false

  constructor(public gameService: GameService) {
    this.gameService.win$.subscribe(value => this.winModalShow = value)
  }

  startGame(toggle: boolean) {
    this.gameService.newGame()
    this.modalShow = toggle;
  }

  restartGame(toggle: boolean) {
    this.gameService.newGame()
    this.winModalShow = toggle
  }

}
