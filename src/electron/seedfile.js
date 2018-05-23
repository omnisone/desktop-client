const WebTorrent = require('webtorrent-hybrid')
const fs = require('fs')
const path = require('path')

const torrentClient = new WebTorrent({ dht: false })

let filepath = (new Buffer(process.argv[2], 'base64')).toString('ascii')
filepath = path.resolve(filepath)

const fileBuf = fs.readFileSync(filepath)
fileBuf.name = filepath.split(' ').join('_')

const trackers = ['http://localhost:3303']
torrentClient.seed(fileBuf, { announceList: [trackers] }, function (torrent) {
    console.log('seeding', torrent.infoHash)
    console.log('seeding', torrent.magnetURI)
})
