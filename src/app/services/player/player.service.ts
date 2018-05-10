import { Injectable } from '@angular/core';

/* Models */
import { Song } from '../../models/song'

declare var WebTorrent: any

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  /* Audio */
  private audio: HTMLAudioElement = null
  private audioUrlMap: Map<string, string> = new Map()
  public playing: boolean

  /* Callbacks */
  private _updateTrackInfo: Function

  /* WebTorrent */
  private trackers = ['udp://localhost:3303']
  private torrentClient: any

  constructor() {
    this.torrentClient = new WebTorrent({ dht: false })
    this.playing = false

    this._updateTrackInfo = () => {}
  }

  public loadTrack(track: Song, callback?: Function) {
    this.pause()

    if (this.audioUrlMap.has(track.id)) {
      this.renderTrack(track, this.audioUrlMap.get(track.id), callback)
      return
    }

    const self = this
    this.torrentClient.add(track.magnet, { announceList: [this.trackers] }, function (torrent) {
      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp3')
      })

      file.getBlobURL(function (err, url) {
        if (err) throw err
        self.renderTrack(track, url, callback)
      })
    })
  }

  public preloadTrack(track: Song, callback?: Function) {
    if (this.audioUrlMap.has(track.id)) {
      return
    }

    const self = this
    this.torrentClient.add(track.magnet, { announceList: [this.trackers] }, function (torrent) {
      const file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp3')
      })

      file.getBlobURL(function (err, url) {
        if (err) throw err
        self.audioUrlMap.set(track.id, url)

        if (callback) {
          callback()
        }
      })
    })
  }

  public play() {
    if (!this.audio) {
      return
    }

    this.audio.play()
    this.playing = true
  }

  public pause() {
    if (!this.audio) {
      return
    }

    this.audio.pause()
    this.playing = false
  }

  public onTrackInfo(callback: Function) {
    if(callback) {
      this._updateTrackInfo = callback
    }
  }

  private renderTrack(track: Song, url: string, callback?: Function) {
    if (this.audio) {
      this.audio.pause()
    }

    this._updateTrackInfo(track)

    this.audioUrlMap.set(track.id, url)
    this.audio = new Audio()
    this.audio.src = url
    this.play()

    if (callback) {
      callback()
    }
  }
}
