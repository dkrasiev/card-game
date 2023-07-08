import { Injectable, OnDestroy } from '@angular/core';
import { DatePipe } from '@angular/common';

@Injectable({
  providedIn: 'root',
})
export class TimeService implements OnDestroy {
  public formattedTime: string = '00:00';

  private ONE_SECOND = 1000;
  private time: number = 0;
  private interval: any;

  constructor(private datePipe: DatePipe) { }

  public ngOnDestroy(): void {
    this.stop();
  }

  public start() {
    this.stop();
    this.reset();

    this.interval = setInterval(() => {
      this.time++;
      this.formattedTime = this.formatTime(this.time * 1000);
    }, this.ONE_SECOND);
  }

  public stop() {
    if (this.interval) {
      clearInterval(this.interval);
    }
  }

  public reset() {
    this.time = 0;
    this.formattedTime = this.formatTime(this.time);
  }

  private formatTime(ms: number): string {
    return this.datePipe.transform(new Date(ms), 'mm:ss')!;
  }
}
