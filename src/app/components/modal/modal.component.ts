import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() startGame:Function

  modalShow:boolean = true

  handleClick() {
    this.startGame()
    this.modalShow = false
  }

}
