import {Component, Input} from '@angular/core';
import {ICard} from "../../model/card";
import {GameService} from "../../services/game.service";
import {state} from "@angular/animations";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css'],
  animations: []
})
export class CardComponent {
  @Input() card!: ICard

  constructor(public gameService: GameService) {
  }

  cardClick(id: number, value: number) {
    this.gameService.cardClick(id, value)
  }

}

