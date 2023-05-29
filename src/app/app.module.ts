import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { GameComponent } from './game/game.component';
import { CardComponent } from './card/card.component';
import { ModalComponent } from './modal/modal.component';
import { WinModalComponent } from './win-modal/win-modal.component';

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
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
