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

  public test() {
    console.log('testing')
    // const torrBuf = fs.readFileSync('test3.txt.torrent')
    const torrBuf = 'magnet:?xt=urn:btih:be6ba1051b5ac85e5ce112d27f384846f380ef21&dn=DO+YOU+KNOW+DA+WAE+(TRAP+REMIX).mp3&tr=http%3A%2F%2Flocalhost%3A3303&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'

    var opts = () => {
      console.log('called')
      return {
        customParam: 'booty',
        smh: true
      }
    }

    const trackers = ['udp://localhost:3303']

    this.torrentClient.add(torrBuf, { announceList: [trackers], getAnnounceOpts: opts }, function (torrent) {
      // Got torrent metadata!
      console.log('Client is downloading:', torrent.infoHash)

      var file = torrent.files.find(function (file) {
        return file.name.endsWith('.mp3')
      })

      file.getBlobURL(function (err, url) {
        if (err) throw err
        let audio = new Audio()
        audio.src = url
        audio.play()
      })

      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      // let audio = document.createElement('audio')
      // document.body.appendChild(audio)

      // Stream the video into the video tag
      // file.createReadStream().pipe(audio)

      // file.appendTo('body')

    })
  }
}
