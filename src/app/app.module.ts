import { NgModule } from '@angular/core';
import { DatePipe } from '@angular/common';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { TimeService } from './services/time.service';

@NgModule({
  declarations: [AppComponent, GameComponent, CardComponent, ModalComponent],
  imports: [BrowserModule, AppRoutingModule, FormsModule],
  providers: [DatePipe, TimeService],
  bootstrap: [AppComponent],
})
export class AppModule { }
