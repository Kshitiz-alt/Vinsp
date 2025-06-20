
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
    album?: string;
    year?: string;
    primaryArtists?: string;
    image: { url: string }[];
    downloadUrl: { url: string }[]
    artists: string[];
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
  image: string[] // or whatever type image actually is
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
}