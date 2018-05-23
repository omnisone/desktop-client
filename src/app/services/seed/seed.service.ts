import { Injectable } from '@angular/core';

/* Models */
import { ReleaseFile } from '../../models/song'

/* Services */
import { ElectronService } from 'ngx-electron';

declare var WebTorrent: any

@Injectable({
  providedIn: 'root'
})
export class SeedService {

  private FileAPI
  private fs
  private WebTorrent
  private torrentClient
  private trackers: string[] = ['udp://localhost:3303']

  constructor(private _electronService: ElectronService) {
    this.fs = this._electronService.remote.require('fs')
    this.torrentClient = new WebTorrent()
  }

  public seedFile(song: ReleaseFile, callback: Function) {
    const self = this

    self.torrentClient.seed(song.fileObject, (torrent) => {
      console.log('seeding', torrent.infoHash)
      callback(torrent.magnetURI)
    })
  }
}
