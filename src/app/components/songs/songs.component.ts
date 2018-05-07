import { Component, OnInit } from '@angular/core'

/* Models */
import { Song } from '../../models/song'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.css']
})
export class SongsComponent implements OnInit {

  public allSongs: Song[] = []

  constructor() { }

  ngOnInit() {
    for (let i = 0; i < 10; i++) {
      this.allSongs.push(Song.randomSong())
    }
  }

  public parseTime(duration: number): string {

    let seconds: number | string = Math.floor((duration % 1000) / 100)
    let minutes: number | string = Math.floor((duration / 1000) % 60)
    let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24)

    // let milliseconds = parseInt((duration.toString % 1000) / 100)
    //   , seconds = parseInt((duration.toString / 1000) % 60)
    //   , minutes = parseInt((duration.toString / (1000 * 60)) % 60)
    //   , hours = parseInt((duration.toString / (1000 * 60 * 60)) % 24);

    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if(Number(hours) === 0) {
      return minutes + ":" + seconds
    } else {
      return hours + ":" + minutes + ":" + seconds
    }
  }

}
