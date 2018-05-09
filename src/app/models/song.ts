import { Album } from './album'
import { Artist } from './artist'

export class Song {
    public name: string
    public duration: number
    public album?: Album
    public artist: Artist
    public genre: string
    public magnet?: string = 'magnet:?xt=urn:btih:be6ba1051b5ac85e5ce112d27f384846f380ef21&dn=DO+YOU+KNOW+DA+WAE+(TRAP+REMIX).mp3&tr=udp%3A%2F%2Flocalhost%3A3303'

    public static randomSong(): Song {
        const genres = ['Rock', 'Jazz', 'Metal', 'Pop', 'Blues']
        const names = ['Phantom Flat', 'The Unoriginal Romance', 'I Tells On Chairman', 'Can Thrill', 'Through Nobody Legacy']

        let song = new Song()
        song.name = names[Math.floor(Math.random()*names.length)]
        song.genre = genres[Math.floor(Math.random()*genres.length)]
        song.album = Album.randomAlbum()
        song.artist = Artist.randomgArtist()
        song.duration = Math.random() * (6*60*1000 - 2*60*1000) + 2*60*1000

        return song
    }
}