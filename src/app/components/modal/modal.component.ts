import {
  Component,
  EventEmitter,
  Input,
  OnDestroy,
  Output,
} from '@angular/core';

@Component({
  selector: 'app-modal',
  templateUrl: './modal.component.html',
  styleUrls: ['./modal.component.css'],
})
export class ModalComponent implements OnDestroy {
  @Input() public title = 'title';
  @Input() public closable = false;

  @Output() public click = new EventEmitter();
  @Output() public destroy = new EventEmitter();

  public ngOnDestroy(): void {
    this.destroy.emit();
  }

  public emitClick() {
    this.click.emit();
  }

  public onBackdropClick(e: Event) {
    e.stopPropagation();

    if (this.closable) {
      this.click.emit();
    }
  }
}
