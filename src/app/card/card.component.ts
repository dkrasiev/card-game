import {Component, Input} from '@angular/core';
import {ICard} from "../model/card";

@Component({
  selector: 'app-card',
  templateUrl: './card.component.html',
  styleUrls: ['./card.component.css']
})
export class CardComponent {
  // @ts-ignore
  @Input() card:ICard
  @Input() handleClick:any


  constructor() {
  }

}

