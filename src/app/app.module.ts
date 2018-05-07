import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { FormsModule } from '@angular/forms';

/* Angular Material */
import { 
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatInputModule,
  MatCardModule, MatListModule
} from '@angular/material';

import { AppComponent } from './app.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { SearchBarComponent } from './components/player-controls/search-bar/search-bar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SongsComponent } from './components/songs/songs.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerControlsComponent,
    SearchBarComponent,
    SidenavComponent,
    SongsComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxElectronModule,
    FormsModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatInputModule,
    MatCardModule, MatListModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
