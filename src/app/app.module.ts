import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { NgModule } from '@angular/core';
import { NgxElectronModule } from 'ngx-electron';
import { FormsModule } from '@angular/forms';
import { DragulaModule } from 'ng2-dragula';

/* Angular Material */
import { 
  MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatInputModule,
  MatCardModule, MatListModule, MatTableModule, MatSortModule, MatSliderModule
} from '@angular/material';
import 'hammerjs'

import { AppComponent } from './app.component';
import { PlayerControlsComponent } from './components/player-controls/player-controls.component';
import { SearchBarComponent } from './components/player-controls/search-bar/search-bar.component';
import { SidenavComponent } from './components/sidenav/sidenav.component';
import { SongsComponent } from './components/songs/songs.component';
import { TrackInfoComponent } from './components/player-controls/track-info/track-info.component';

@NgModule({
  declarations: [
    AppComponent,
    PlayerControlsComponent,
    SearchBarComponent,
    SidenavComponent,
    SongsComponent,
    TrackInfoComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    NgxElectronModule,
    FormsModule,
    DragulaModule,
    MatButtonModule, MatCheckboxModule, MatToolbarModule, MatIconModule, MatInputModule,
    MatCardModule, MatListModule, MatTableModule, MatSortModule, MatSliderModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
