import { Injectable } from '@angular/core';

import { Game } from '../model/game';
import { TimeService } from './time.service';
import { CountService } from './count.service';
import { GameState } from '../model/game-state.enum';

@Injectable()
export class GameService {
  public game?: Game;

  private canSelect = true;

  constructor(
    private timeService: TimeService,
    private countService: CountService
  ) { }

  public startNewGame(rowCount: number, columnCount: number) {
    this.game = new Game(rowCount, columnCount);

    this.countService.reset();
    this.timeService.start();
  }

  public async selectCard(id: number) {
    if (!this.game || !this.canSelect) {
      return;
    }

    const isTurnMaked = this.game.makeTurn(id);
    if (isTurnMaked) this.game.next();

    while (this.game.state !== GameState.WAITING) {
      if (this.game.state === GameState.MISSMATCH) {
        await this.wait(1000);
      }

      if (this.game.state === GameState.CLOSED) {
        this.countService.step();
      }

      if (this.game.state === GameState.WIN) {
        this.timeService.stop();
        break;
      }

      this.game.next();
    }
  }

  private wait(ms: number) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
}
