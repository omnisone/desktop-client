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

  /* WebTorrent */
  private trackers = ['udp://localhost:3303']
  private torrentClient: any

  constructor() {
    this.torrentClient = new WebTorrent({ dht: false })
  }

  public loadTrack(track: Song, callback?: Function) {
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

  public play() {
    if (!this.audio) {
      console.warn('audio is null')
      return
    }

    this.audio.play()
  }

  public pause() {
    if (!this.audio) {
      console.warn('audio is null')
      return
    }

    this.audio.pause()
  }

  private renderTrack(track: Song, url: string, callback?: Function) {
    if (this.audio) {
      this.audio.pause()
    }

    this.audioUrlMap.set(track.id, url)
    this.audio = new Audio()
    this.audio.src = url
    this.audio.play()

    if (callback) {
      callback()
    }
  }
}
