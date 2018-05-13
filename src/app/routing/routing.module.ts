import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { Routes, RouterModule } from '@angular/router';

/* App components */
import { SongsComponent } from '../components/songs/songs.component';
import { ReleaseComponent } from '../components/release/release.component';

const routes: Routes = [
  {
    path: '',
    component: SongsComponent
  },
  {
    path: 'release_tracks',
    component: ReleaseComponent
  }
]

@NgModule({
  imports: [
    CommonModule,
    RouterModule.forRoot(routes, { useHash: true })
  ],
  exports: [RouterModule],
  declarations: []
})
export class RoutingModule { }
