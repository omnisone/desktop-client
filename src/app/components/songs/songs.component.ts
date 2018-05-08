import { Component, OnInit, ViewChild } from '@angular/core'
import { MatSort, MatTableDataSource } from '@angular/material';

/* Models */
import { Song } from '../../models/song'

@Component({
  selector: 'app-songs',
  templateUrl: './songs.component.html',
  styleUrls: ['./songs.component.scss']
})
export class SongsComponent implements OnInit {

  public allSongs: Song[] = []
  public selectedSongs: Song[] = []

  /* Table data */
  @ViewChild(MatSort) sort: MatSort;
  public displayedColumns: string[] = ['songName', 'songDuration', 'songArtist', 'songAlbum', 'songGenre']
  public dataSource: MatTableDataSource<Song>

  constructor() {
    for (let i = 0; i < 100; i++) {
      let song: any = Song.randomSong()
      song.position = i + 1
      this.allSongs.push(song)
    }

    this.dataSource = new MatTableDataSource(this.allSongs)
    this.dataSource.sortingDataAccessor = (item: Song, property) => {
      console.log(item, property)
      switch(property) {
        case 'project.name': return item.name;
        default: return item[property];
      }
    }
    this.dataSource.sort = this.sort
  }

  ngOnInit() { }

  public parseTime(duration: number): string {

    let seconds: number | string = Math.floor((duration % 1000) / 100)
    let minutes: number | string = Math.floor((duration / 1000) % 60)
    let hours: number | string = Math.floor((duration / (1000 * 60 * 60)) % 24)

    // let milliseconds = parseInt((duration.toString % 1000) / 100)
    //   , seconds = parseInt((duration.toString / 1000) % 60)
    //   , minutes = parseInt((duration.toString / (1000 * 60)) % 60)
    //   , hours = parseInt((duration.toString / (1000 * 60 * 60)) % 24);

    seconds = (seconds < 10) ? "0" + seconds : seconds;

    if (Number(hours) === 0) {
      return minutes + ":" + seconds
    } else {
      return hours + ":" + minutes + ":" + seconds
    }
  }

  public selectSong(song: Song) {
    this.selectedSongs = [song]
  }

  public playSong(song: Song) {
    console.log('Playing:', song.name)
  }

  public print(...args) {
    console.log(args)
  }

}
