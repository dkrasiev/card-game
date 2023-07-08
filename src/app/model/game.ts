import { ICard } from './card';
import { GameState } from './game-state.enum';

export class Game {
  public get state() {
    return this._state;
  }

  public cards: ICard[] = [];

  private lastTurn?: number;

  private first?: ICard;
  private second?: ICard;

  private _state: GameState = GameState.WAITING;

  private get isWin() {
    return !this.cards.some((card) => card.matched === false);
  }

  constructor(rowCount: number = 6, columnCount: number = 6) {
    const cardCount = rowCount * columnCount;

    if (cardCount % 2 === 1) {
      throw new Error('Количество карт должно делиться на два');
    }

    this.cards = this.createCards(cardCount);
    this.shuffleCards(this.cards);
  }

  public next(): void {
    switch (this._state) {
      // waiting -> selected or waiting -> waiting
      case GameState.WAITING:
        if (!this.lastTurn) {
          this._state = GameState.WAITING;
          return;
        }

        const card = this.getCardById(this.lastTurn);

        if (!card) {
          this._state = GameState.WAITING;
          return;
        }

        if (this.first) {
          // нажали на ту же карту
          if (this.first.id === card.id) {
            this._state = GameState.WAITING;
            return;
          }

          this.second = card;
        } else {
          this.first = card;
        }

        this.lastTurn = undefined;

        if (this.first && !this.second) {
          this._state = GameState.SELECTED_FIRST;
        } else if (this.second) {
          this._state = GameState.SELECTED_SECOND;
        }

        break;

      // selected -> opened
      case GameState.SELECTED_FIRST:
      case GameState.SELECTED_SECOND:
        if (this.first && !this.second) {
          this.first.clicked = true;
          this._state = GameState.OPENED_FIRST;
        }

        if (this.second) {
          this.second.clicked = true;
          this._state = GameState.OPENED_SECOND;
        }

        break;

      // opened -> waiting or opened -> match or opened -> missmatch
      case GameState.OPENED_FIRST:
      case GameState.OPENED_SECOND:
        if (this.first && this.second) {
          if (!this.first || !this.second) {
            return;
          }

          const matched = this.first.value === this.second.value;

          if (matched) {
            this.first.matched = true;
            this.second.matched = true;
          }

          this._state = matched ? GameState.MATCH : GameState.MISSMATCH;

          return;
        }

        if (this.first && !this.second) {
          this._state = GameState.WAITING;
          return;
        }

        break;

      // match -> waiting or missmatch -> waiting
      case GameState.MATCH:
      case GameState.MISSMATCH:
        this._state = GameState.CLOSED;
        break;

      // closed -> waiting or closed -> win
      case GameState.CLOSED:
        this._state = GameState.WAITING;

        if (this.first) this.first.clicked = false;
        if (this.second) this.second.clicked = false;

        this.first = undefined;
        this.second = undefined;

        if (this.isWin) {
          this._state = GameState.WIN;
        }

        break;
    }
  }

  public makeTurn(id: number): boolean {
    if (this.state !== GameState.WAITING) {
      return false;
    }

    this.lastTurn = id;
    return true;
  }

  public shuffleCards(cards: ICard[]) {
    this.cards = cards.sort(() => Math.random() - 0.5);
  }

  private createCards(cardCount: number) {
    const res = [];

    for (let id = 1; id < cardCount + 1; id++) {
      res.push({
        id,
        value: Math.round(id / 2),
        clicked: false,
        matched: false,
      });
    }

    return res;
  }

  private getCardById(id: number): ICard | undefined {
    return this.cards.find((card: ICard) => card.id === id);
  }
}
