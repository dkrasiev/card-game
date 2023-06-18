import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameService} from "../../services/game.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  modalShow: boolean = true

  constructor(private gameService: GameService) {
  }

  startGame() {
    this.gameService.newGame()
    this.modalShow = false
  }


}
