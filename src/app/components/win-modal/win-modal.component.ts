import {Component, Input} from '@angular/core';
import {GameService} from "../../services/game.service";

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.css']
})
export class WinModalComponent {
  @Input() count!: number | null
  @Input() time!: string | null

  constructor(private gameService:GameService) {
  }

  restartGame() {
    this.gameService.newGame()
  }

}
