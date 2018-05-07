import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';

/* Angular Material */
import { MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule } from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerControlsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxElectronModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
