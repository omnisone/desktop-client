import { Song } from './song'

export class Album {
    public name: string
    public tracks: Song []

    public static randomAlbum(): Album {
        const names = ['The Clean Situations', 'They Makes Many', 'The Program Can', 'Fly Utopianism', 'Strange']

        let album = new Album()

        album.name = names[Math.floor(Math.random()*names.length)]
        album.tracks = []

        return album
    }
}
