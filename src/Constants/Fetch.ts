import axios from "axios"
import { useLocation } from "react-router-dom"


export const SONGS = async (query: string, limit: number) => {
    try {
        const Songs = await axios.get(`https://saavn.dev/api/search/songs?query=${query}&limit=${limit}`)
        const { data } = Songs.data
        return { data };
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}

export const ALBUMS = async (id: string) => {
    try {
        const albums = await axios.get(`https://saavn.dev/api/albums?id=${id}`)
        const { data } = albums.data
        // console.log(data)
        return { data };
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}

export const ARTISTS = async (id: string) => {

    try {
        const [res1, res2] = await Promise.all([
            axios.get(`https://saavn.dev/api/artists?id=${id}`),
            axios.get(`https://saavn.dev/api/artists/${id}/songs`)
        ])

        return {
            artists: res1.data.data,
            artistSongs: res2.data.data
        };
    } catch (error) {
        console.error("Couldn't fetch artists", error)
    }
}

export const SEARCH = async (query: string) => {
    try {
        const [res1, res2] = await Promise.all([
            axios.get(`https://saavn.dev/api/search?query=${query}`),
            axios.get(`https://saavn.dev/api/search/songs?query=${query}`),
        ]);
        console.log(res2.data.data)
        return {
            dataFetched: res1.data.data,
            dataOfSongs: res2.data.data
        };

    } catch {
        throw new Error('Searched data not found');
    }
}

export function useQuery() {
    return new URLSearchParams(useLocation().search);
}

export function ProperTitle(str: string): string {
    const title = document.createElement('textarea');
    title.innerHTML = str;
    return title.value;
}

export function ProperTime(time:number){
    const minutes = Math.floor(time / 60);
    const seconds = Math.floor(time % 60).toString().padStart(2,"0");
    return `${minutes} : ${seconds}`
}