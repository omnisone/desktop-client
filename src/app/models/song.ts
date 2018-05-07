import { Album } from './album'
import { Artist } from './artist'

export class Song {
    public name: string
    public duration: number
    public album?: Album
    public artist: Artist
    public genre: string

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