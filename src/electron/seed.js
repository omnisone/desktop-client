const WebTorrent = require('webtorrent-hybrid')
const fs = require('fs')

const torrentClient = new WebTorrent({ dht: false })

const fileBuf = fs.readFileSync(process.argv[2])
fileBuf.name = "/Users/vados/Downloads/DO YOU KNOW DA WAE (TRAP REMIX).mp3"

const trackers = ['udp://localhost:3303']
torrentClient.seed(fileBuf, { announceList: [trackers] }, function (torrent) {
    console.log('seeding', torrent.infoHash)
    console.log('seeding', torrent.magnetURI)
})
