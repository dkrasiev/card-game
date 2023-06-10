import {Component, Input} from '@angular/core';

@Component({
  selector: 'app-win-modal',
  templateUrl: './win-modal.component.html',
  styleUrls: ['./win-modal.component.css']
})
export class WinModalComponent {
  @Input() count: number
  @Input() time: string | null
  @Input() restartGame: Function

}
