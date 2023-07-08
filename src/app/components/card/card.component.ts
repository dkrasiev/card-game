import { Component, EventEmitter, Input, Output } from '@angular/core';
import { GameService } from '../../services/game.service';

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
})
export class CardComponent {
  @Input() public id!: number;
  @Input() public value!: number;
  @Input() public clicked!: boolean;
  @Input() public matched!: boolean;

  @Output()
  public select = new EventEmitter<number>();

  constructor(public gameService: GameService) { }

  onClick() {
    this.select.emit(this.id);
  }
}
