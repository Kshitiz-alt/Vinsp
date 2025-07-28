import axios from "axios"
import { useLocation } from "react-router-dom"
// import type { artistTypes } from "../types"





export const SONGS = async (query: string, limit: number,page:number) => {
    try {
        const Songs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search/songs?query=${query}&limit=${limit}&page=${page}`)
        console.log(Songs)
        return Songs.data;
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}

export const CAROUSEL = async(id:number) => {
    try{
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/albums/${id}`)
        return data.data.album
    }catch(err){
        console.error("Data amiss",err)
    }
}


export const ALBUMS = async (id:number) => {
    try {
        const Songs = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/albums/${id}/songs`)
        // console.log(Songs)
        return Songs.data
    } catch (error) {
        console.error("Couldn't fetch songs", error)
    }
}

export const ARTISTS = async (id:number) => {

    try {
        const data = await axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/artists/${id}/songs`)
        return data.data
    } catch (error) {
        console.error("Couldn't fetch artists", error)
    }
}

export const SEARCH = async (query: string,page:number,limit:number) => {
    try {
        const [res1, res2,res3] = await Promise.all([
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search/albums?query=${query}&page=${page}&limit=${limit}`),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search/songs?query=${query}&limit=${limit}&page=${page}`),
            axios.get(`${import.meta.env.VITE_BACKEND_URL}/api/search/artists?query=${query}&limit=${limit}&page=${page}`)
        ]);
        return {
            dataOfAlbums: res1,
            dataOfSongs: res2,
            dataOfArtist: res3
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

export function ProperLyrics(raw:string):string{
    return raw
    .replace(/(\[.*?\])/g, "\n\n$1\n")
    // Insert newline between lowercase and uppercase (e.g., end of a sentence and next line starts)
    .replace(/([a-z])([A-Z])/g, "$1\n$2")
    // Trim excess whitespace
    .trim();
}