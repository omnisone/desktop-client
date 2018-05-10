import { Component, OnInit } from '@angular/core';

/* Services */
import { PlayerService } from '../../services/player/player.service';

@Component({
  selector: 'app-player-controls',
  templateUrl: './player-controls.component.html',
  styleUrls: ['./player-controls.component.scss']
})
export class PlayerControlsComponent implements OnInit {

  constructor(private _playerService: PlayerService) { }

  ngOnInit() {
  }

  public playpause() {
    if(this._playerService.playing) {
      this._playerService.pause()
    } else {
      this._playerService.play()
    }
  }

}
