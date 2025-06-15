
export interface Songtypes {
    index: string
    id: string;
    name: string;
    album?: string;
    year?: string;
    primaryArtists?: string;
    image: { url: string }[];
    downloadUrl: {url: string }[]
    artists:string[];
}


export interface selectedSongs{
    title:string
    audio:string
    id?:string;
    image?:string;
}


export interface artistTypes {
    index: string
    id: string;
    name: string;
    album?: string;
    year?: string;
    primaryArtists?: string;
    image: { url: string }[];
}