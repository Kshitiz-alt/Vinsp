import type { Dispatch, SetStateAction } from "react";

export interface OutletContextType {
    selectedSongs: selectedSongs[],
    currentSong:selectedSongs | null;
    selectedAlbums?:selectedAlbums[];
    setSelectedAlbums?:Dispatch<SetStateAction<selectedAlbums[]>>
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
    id: number;
    name: string;
    title: string;
    duration: number;
    albumId: number
    year?: string;
    image?: string;
    audio: string
    artist?: string
}

export interface AlbumItenary {
    S_no:number;
    // lyrics:string;
    duration: number;
    title: string;
    audio: string;
    image: string;
    artist: string;
    isCurrent: boolean;
    onAudioPlay: (ref: HTMLAudioElement) => void;
    onSelect?: (song: { title: string, audio: string, image: string }, isChecked: boolean) => void;
}

export interface PlaylistItemTypes {
    id: number;
    // lyrics:string;
    albumId: number;
    name: string;
    image: string;
    title: string;
    audio: string;
    duration: number
    artist: string
}

export interface selectedAlbums {
    title:string;
    image?:string;
    id?:number;
    songs?:selectedSongs[];
}
export interface selectedSongs {
    title: string
    audio: string
    id?: number;
    image?: string;
    artist?: string;
    duration?: number;
}

export interface albumsTypes {
    id: number;
    title: string;
    image: string;
    artist?: string;
}

export interface ArtistDataTypes {
    id: number;
    title:string;
    genre:string;
    image?: string;
}

export interface artistTypes {
    id: number;
    title?: string;
    image?: string;
    artist?:string;
}

export interface artistStateTypes {
    duration: number;
    id: number;
    // lyrics:string;
    albumId: number;
    title: string;
    image: string;
    language: string;
    artist: string
    audio: string;
}

export interface SearchTypes {
    image?: string;
    duration: number;
    albumId: number;
    id: number;
    title: string;
    value?: string;
    audio: string
    artist?: string;
}

export interface SearchAlbumTypes {
    image?: string;
    name: string;
    title: string
    id: number;
    albumId: number;
    artist?: string
    length: number;
}

export interface SearchArtistTypes {
    id: number;
    genre: string;
    image?: string;
    title: string;
    albumId: number
}

export interface playbarTypes {
    song: string;
    title: string;
    audio: string
}

export interface PlayProps {
    song: selectedSongs;
    onEnd: () => void;
    setSelectedSong: Dispatch<SetStateAction<selectedSongs[]>>
}

export interface albumsProps{
  albums:albumsTypes[];
}

export interface artistProps{
    artist:artistTypes[];
}

export interface songsProps{
    playlists:Songtypes[];
}