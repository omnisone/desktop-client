import { Component, OnInit, NgZone } from '@angular/core';
import { FormControl } from '@angular/forms';
import { HttpClient } from '@angular/common/http';
import { DomSanitizer, SafeResourceUrl, SafeUrl, SafeStyle } from '@angular/platform-browser';
import { Observable } from 'rxjs';
import { map, startWith } from 'rxjs/operators';

/* Models */
import { Song, ReleaseFile } from '../../models/song'
import { Genres } from '../../models/genres'
import { Album } from '../../models/album'

/* Services */
import { ReleaseService } from '../../services/release/release.service'
import { SeedService } from '../../services/seed/seed.service'

@Component({
  selector: 'app-release',
  templateUrl: './release.component.html',
  styleUrls: ['./release.component.scss']
})
export class ReleaseComponent implements OnInit {

  /* Albums */
  public albums: Album[] = []

  /* Song releases */
  public releaseFiles: ReleaseFile[] = []

  private ETH_USD

  /* Form Control */
  public genreControl: FormControl = new FormControl()
  public filteredGenres: Observable<string[]>
  public albumControl: FormControl = new FormControl()
  public filteredAlbums: Observable<Album[]>

  constructor(private _releaseService: ReleaseService,
    private _seedService: SeedService,
    private _zone: NgZone,
    private _http: HttpClient,
    private _sanitizer: DomSanitizer) { }

  ngOnInit() {
    this._http.get('https://min-api.cryptocompare.com/data/price?fsym=ETH&tsyms=USD')
      .subscribe((data: any) => {
        this.ETH_USD = data.USD
      })

    this.filteredGenres = this.genreControl.valueChanges
      .pipe(
        startWith(''),
        map(val => this.filterGenres(val))
      )

    this.filteredAlbums = this.albumControl.valueChanges
      .pipe(
        startWith<string | Album>(''),
        map(value => typeof value === 'string' ? value : value.name),
        map(name => name ? this.filterAlbums(name) : this.albums.slice())
      )
  }

  public createAlbum(): void {
    let newAlbum = new Album()
    this.albums.push(newAlbum)
  }

  public openUploadDialog(): void {
    this._releaseService
      .openUploadDialog((fileData: ReleaseFile[]) => {
        this._zone.run(() => {
          let uniqueFiles: ReleaseFile[] = []

          fileData.forEach((file: ReleaseFile) => {
            file.priceUSD = 0.99
            this.USDToETH(file)

            let unique: boolean = true
            this.releaseFiles.forEach((releaseFile: ReleaseFile) => {
              if (releaseFile.fileUrl === file.fileUrl) unique = false
            })

            if (unique) {
              this._releaseService.getDuration(file)
              uniqueFiles.push(file)
            }
          })

          this.releaseFiles = this.releaseFiles.concat(uniqueFiles)
        })
      })
  }

  public deleteFile(index: number): void {
    this.releaseFiles.splice(index, 1)
  }

  public release(): void {
    this.releaseFiles.forEach((song: ReleaseFile) => {
      this._seedService.seedFile(song, (magnet: string) => console.log(magnet))
    })
  }

  public USDToETH(releaseFile: ReleaseFile) {
    releaseFile.priceETH = Number((releaseFile.priceUSD / this.ETH_USD).toFixed(6))
  }

  public ETHToUSD(releaseFile: ReleaseFile) {
    releaseFile.priceUSD = Number((releaseFile.priceETH * this.ETH_USD).toFixed(6))
  }

  public parseSeconds(seconds: number): string {
    if (!seconds) {
      return "00:00"
    }

    const hours: number = Math.floor(seconds / (60 ** 2))
    const mins: number = Math.floor(seconds / 60)
    const sec: number = Math.floor(seconds % 60)

    let hh: string = hours.toString()
    let mm: string = mins.toString()
    let ss: string = sec.toString()

    if (hh.length === 0 || !hours) {
      hh = ""
    } else {
      if (hh.length === 1) {
        hh = "0" + hh
      }
      hh += ":"
    }

    if (mm.length === 0 || !mins) {
      mm = "00:"
    } else {
      if (mm.length === 1) {
        mm = "0" + mm
      }
      mm += ":"
    }

    if (ss.length === 1) {
      ss = "0" + ss
    }

    return hh + mm + ss
  }

  private filterGenres(val: string): string[] {
    if (!val) return Genres
    return Genres.filter(option => option.toLowerCase().includes(val.toLowerCase()))
  }

  private filterAlbums(val: string): Album[] {
    return this.albums.filter(option =>
      option.name.toLowerCase().indexOf(val.toLowerCase()) === 0)
  }

  public displayFn(album?: Album): string | undefined {
    return album ? album.name : undefined;
  }

}
