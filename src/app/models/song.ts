import { Album } from './album'
import { Artist } from './artist'

export class Song {
    public name: string
    public duration: number
    public album?: Album
    public artist: Artist
    public genre: string
}
