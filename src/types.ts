import type { Dispatch, SetStateAction } from "react";

export interface OutletContextType {
  selectedSongs: selectedSongs[],
  setSelectedSongs: Dispatch<SetStateAction<selectedSongs[]>>,
  setCurrentSong: Dispatch<SetStateAction<selectedSongs | null>>
}

export interface downloadTypes {
    title: string;
    audio: string;
    image: string;
    artist: string;
    onSelect?: (song: { title: string, audio: string, image: string }, isChecked: boolean) => void;
}
export interface Songtypes {
    index: string
    id: string;
    name: string;
    title:string;
    duration:number;
    album?: {id:string};
    year?: string;
    primaryArtists?: string;
    image: { url: string }[];
    downloadUrl: { url: string }[]
    artists: {all:Artist[]};
}

export interface AlbumItenary {
    duration: number;
    title: string;
    audio: string;
    image: string;
    artists: string[];
    isCurrent: boolean;
    onAudioPlay : (ref:HTMLAudioElement) => void;
    onSelect?: (song: { title: string, audio: string, image: string }, isChecked: boolean) => void;
}

type Artist = {
  id: string
  name: string
  role: string
  type: string
  image: {url:string}[]
}


export interface AlbumItemTypes {
    id: string
    name: string
    image: { url: string }[];
    title: string;
    downloadUrl: { url: string }[]
    audio: string
    duration: number
    artists: {all: Artist[]}
}

export interface selectedSongs {
    title: string
    audio: string
    id?: string;
    image?: string;
    artist?:string
    duration?:number
}

export interface albumsTypes {
    id: string,
    name: string,
    image?: { url: string }[]
}

export interface artistTypes {
    index: string
    id: string;
    name: string;
    album?: string;
    year?: string;
    primaryArtists?: string;
    image: { url: string }[];
    artist?: string;
}

export interface artistStateTypes {
    duration:number;
    id:string;
    name:string;
    language:string;
    artists:{all:Artist[]}
}

export interface SearchTypes {
    image?:{url:string}[];
    duration:number;
    id:string
    name:string;
    title:string;
    value?:string;
    artists?:{all:Artist[]}
    downloadUrl:{url:string}[]
}

export interface SearchAlbumTypes {
    image?:{url:string}[];
    name:string;
    title:string
    id:string;
    artist?:string
    length:number
}

export interface SearchArtistTypes{
    id:string;
    description:string;
    image?:{url:string}[];
    title:string
}

export interface playbarTypes{
    song:string;
    title:string;
    downloadUrl:{url:string}
}