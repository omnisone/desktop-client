import { Component, OnInit } from '@angular/core';

/* Models */
import { Song } from '../../../models/song'

/* Services */
import { PlayerService } from '../../../services/player/player.service';

@Component({
  selector: 'pc-track-info',
  templateUrl: './track-info.component.html',
  styleUrls: ['./track-info.component.scss']
})
export class TrackInfoComponent implements OnInit {

  public currentSong: Song
  public playerTime: number

  constructor(private _playerService: PlayerService) { }

  ngOnInit() {
    this._playerService.currentSong
      .subscribe((song: Song) => {
        this.currentSong = song

        if(this.currentSong) {
          this._playerService.onTimeUpdate(this.onTimeUpdate())
        }
      })
  }

  private onTimeUpdate() {
    const self: TrackInfoComponent = this
    return (playerTime: number) => {
      self.playerTime = playerTime
    }
  }

}
