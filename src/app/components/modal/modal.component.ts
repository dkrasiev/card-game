import {Component, EventEmitter, Input, Output} from '@angular/core';
import {GameService} from "../../services/game.service";


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() title!:string
  @Input() modalShow!:boolean
  @Input() winModalShow!:boolean
  @Output() onModal = new EventEmitter()
  @Output() onWinModal = new EventEmitter()


  constructor(private gameService: GameService) {
  }

}
