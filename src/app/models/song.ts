import { Album } from './album'
import { Artist } from './artist'

import { v4 as uuid4 } from 'uuid'

export class Song {
    public id?: string
    public name: string
    public duration: number
    public album?: Album
    public artist: Artist
    public genre: string
    public magnet?: string = 'magnet:?xt=urn:btih:be6ba1051b5ac85e5ce112d27f384846f380ef21&dn=DO+YOU+KNOW+DA+WAE+(TRAP+REMIX).mp3&tr=http%3A%2F%2Flocalhost%3A3303&tr=wss%3A%2F%2Ftracker.btorrent.xyz&tr=wss%3A%2F%2Ftracker.fastcast.nz&tr=wss%3A%2F%2Ftracker.openwebtorrent.com'
    // public magnet?: string = 'magnet:?xt=urn:btih:5456a5735d56465ca6d9f0ba6af268e556916230&dn=3&tr=udp%3A%2F%2Flocalhost%3A3303'

    public static randomSong(): Song {
        const genres = ['Rock', 'Jazz', 'Metal', 'Pop', 'Blues']
        const names = ['Phantom Flat', 'The Unoriginal Romance', 'I Tells On Chairman', 'Can Thrill', 'Through Nobody Legacy']

        let song = new Song()
        song.id = uuid4()
        song.name = names[Math.floor(Math.random() * names.length)]
        song.genre = genres[Math.floor(Math.random() * genres.length)]
        song.album = Album.randomAlbum()
        song.artist = Artist.randomgArtist()
        song.duration = Math.random() * (6 * 60 * 1000 - 2 * 60 * 1000) + 2 * 60 * 1000

        return song
    }
}

export class ReleaseFile extends Song {
    public fileUrl: string
    public fileObject: File
    public priceUSD?: number
    public priceETH?: number
}