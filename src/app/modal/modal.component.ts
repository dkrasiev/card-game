import {Component, Input} from '@angular/core';


@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent {
  @Input() click:any

  modalShow:boolean = true

  handleClick() {
    this.click()
    this.modalShow = false
  }

}
