import axios from "axios"


export const SONGS = async (query:string,limit:number) => {
    try {
        const TopSongs = await axios.get(`https://saavn.dev/api/search/songs?query=${query}&limit=${limit}`)
        const { data } = TopSongs.data
        // console.log(data)
        return {data}
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}

export const ALBUMS = async (id:string) => {
    try {
        const TopSongs = await axios.get(`https://saavn.dev/api/albums?id=${id}`)
        const { data } = TopSongs.data
        console.log(data)
        return {data}
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}


export const ARTISTS = async (id:string) => {
    
    try {
        const TopSongs = await axios.get(`https://saavn.dev/api/artists?id=${id}`)
        // console.log(TopSongs)
        return TopSongs.data.data
    } catch (error) {
        console.error("Couldn't fetch artists", error)
    }
}

export function ProperTitle (str: string):string{
    const title = document.createElement('textarea')
    title.innerHTML = str;
    return title.value 
} 