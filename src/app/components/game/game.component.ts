import { Component, TrackByFunction } from '@angular/core';
import { DatePipe } from '@angular/common';

import { GameService } from '../../services/game.service';
import { TimeService } from '../../services/time.service';
import { CountService } from '../../services/count.service';
import { ICard } from 'src/app/model/card';
import { GameState } from 'src/app/model/game-state.enum';

@Component({
  selector: 'app-game',
  templateUrl: './game.component.html',
  styleUrls: ['./game.component.css'],
  providers: [DatePipe, GameService],
})
export class GameComponent {
  public newGameModalShow: boolean = true;
  public customGameModalShow: boolean = false;
  public rows: ICard[][] = [];

  public get isWin() {
    return this.gameService.game?.state === GameState.WIN;
  }

  public rowInput: number = 4;
  public columnInput: number = 4;

  private difficults = {
    easy: [2, 2],
    medium: [4, 4],
    hard: [6, 6],
  } as const;

  constructor(
    public gameService: GameService,
    public timeService: TimeService,
    public countService: CountService
  ) { }

  public startNewGame(rowCount: number, columnCount: number) {
    console.log(`started new ${rowCount}x${columnCount} game`);

    this.gameService.startNewGame(rowCount, columnCount);
    this.newGameModalShow = false;
    this.timeService.start();

    const game = this.gameService.game!;
    const cards = game.cards;

    const rows: ICard[][] = [];

    for (let i = 0; i < rowCount; i++) {
      const row: ICard[] = cards.slice(i * columnCount, (i + 1) * columnCount);
      rows.push(row);
    }

    this.rows = rows;
  }

  public startPreset(preset: 'easy' | 'medium' | 'hard') {
    this.startNewGame(...this.getDifficult(preset));
  }

  public getDifficult(
    difficultName: 'easy' | 'medium' | 'hard'
  ): [number, number] {
    const difficult = this.difficults[difficultName];

    if (!difficult) {
      console.error('Сложность не найдена');
      throw new Error('Сложность не найдена');
    }

    return [...difficult];
  }

  public cardTrackBy: TrackByFunction<ICard> = (
    _index: number,
    card: ICard
  ) => {
    return card.id;
  };

  public select(id: number) {
    this.gameService.selectCard(id);

    console.log(this.rows);
  }

  public toggleCustomGameModal() {
    this.customGameModalShow = !this.customGameModalShow;
  }
}
