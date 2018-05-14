import { Song } from './song'
import { art } from './defaultArtImage'

export class Album {
    public name: string
    public tracks: Song []
    public artImage: string
    public year: number

    constructor() {
        this.artImage = art
        this.name = "New album"
        this.tracks = []
        this.year = (new Date()).getUTCFullYear()
    }

    public static randomAlbum(): Album {
        const names = ['The Clean Situations', 'They Makes Many', 'The Program Can', 'Fly Utopianism', 'Strange']

        let album = new Album()

        album.name = names[Math.floor(Math.random()*names.length)]
        album.tracks = []

        return album
    }
}
