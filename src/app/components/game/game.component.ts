import {Component, OnInit} from '@angular/core';
import {ICard} from '../../model/card';
import {DatePipe} from "@angular/common";
import {GameService} from "../../services/game.service";
import {Subscription} from "rxjs";

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe]
})
export class GameComponent {

  constructor(public gameService: GameService) {
  }

}
