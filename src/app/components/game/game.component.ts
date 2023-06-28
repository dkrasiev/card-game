import {Component} from '@angular/core';
import {DatePipe} from "@angular/common";
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent {
  modalShow: boolean = true
  winModalShow: boolean = false

  constructor(public gameService: GameService) {
  }

  startGame() {
    this.gameService.newGame()
    this.modalShow = false;
  }

  restartGame() {
    this.gameService.newGame()
    this.winModalShow = false
  }

}
