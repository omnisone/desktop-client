import { Component, OnInit } from '@angular/core'

/* Models */
import { Song } from '../../models/song'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  constructor() { }

  ngOnInit() {
    for(let i = 0; i < 10; i++) {
      console.log(Song.randomSong())
    }
  }

}
