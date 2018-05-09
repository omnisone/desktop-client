import { Injectable } from '@angular/core';

declare var WebTorrent: any

@Injectable({
  providedIn: 'root'
})
export class PlayerService {

  private trackers = ['udp://localhost:3303']
  private torrentClient: any

  constructor() {
    this.torrentClient = new WebTorrent({ dht: false })
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

      // Display the file by adding it to the DOM.
      // Supports video, audio, image files, and more!
      file.appendTo('body')

    })


    // this.torrentClient.add(torrentId, { announceList: [this.trackers] }, function (torrent) {
    //   console.log('Client is downloading:', torrent.infoHash)

    //   // Torrents can contain many files. Let's use the .mp4 file
    //   var file = torrent.files.find(function (file) {
    //     return file.name.endsWith('.mp3')
    //   })

    //   // Display the file by adding it to the DOM.
    //   // Supports video, audio, image files, and more!
    //   file.appendTo('body')
    //   console.log('appended')
    // })
  }
}
