export class Artist {
    public name: string

    public static randomgArtist(): Artist {
        const names = ['Erma Garner', 'Kenneth French', 'Joseph Rogers', 'Archie Wallace', 'Jay Lane', 'Rolando Livingston', 'Kelvin Kaufman', 'Gustavo Adolfo Junipero Rodriguez Rivera']

        let artist = new Artist()
        artist.name = names[Math.floor(Math.random()*names.length)]

        return artist
    }
}
