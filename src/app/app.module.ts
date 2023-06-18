import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './components/game/game.component';
import { CardComponent } from './components/card/card.component';
import { ModalComponent } from './components/modal/modal.component';
import { WinModalComponent } from './components/win-modal/win-modal.component';
import {DatePipe} from "@angular/common";
import {GameService} from "./services/game.service";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CardComponent,
    ModalComponent,
    WinModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe, GameService],
  bootstrap: [AppComponent]
})
export class AppModule { }
