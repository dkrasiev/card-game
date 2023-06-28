import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {GameComponent} from './components/game/game.component';
import {CardComponent} from './components/card/card.component';
import {ModalComponent} from './components/modal/modal.component';
import {DatePipe} from "@angular/common";
import {GameService} from "./services/game.service";
import {Game} from "./services/Game";

@NgModule({
  declarations: [
    AppComponent,
    GameComponent,
    CardComponent,
    ModalComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [DatePipe, GameService, Game],
  bootstrap: [AppComponent]
})
export class AppModule {
}
