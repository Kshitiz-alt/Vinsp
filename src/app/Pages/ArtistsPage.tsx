import { motion } from 'framer-motion'
import { useEffect, useState } from "react";
import { useOutletContext, useParams } from "react-router-dom";
import { ARTISTS } from "../../Constants/Fetch";
import type {
    ArtistDataTypes,
    artistStateTypes,
    OutletContextType,
    SearchTypes,
    selectedSongs,
} from "../../types";
import PlaylistItem from "../../Components/subComponents/PlaylistItem";
import { BiPlay } from "react-icons/bi";

const ArtistsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [artistState, setArtistState] = useState<artistStateTypes[]>([]);
    const [artistData, setArtistData] = useState<ArtistDataTypes | null>(null);
    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();
    const [isTitle, setTitle] = useState<string | null>(null);

    const { setSelectedSongs, setCurrentSong } = useOutletContext<OutletContextType>();

    useEffect(() => {
        const fetchArtist = async () => {
            if (!id) return;
            const data = await ARTISTS(Number(id));
            if (data) {
                console.log(data)
                setArtistData(data);
                setArtistState(data.songs || []);
            }
        };
        fetchArtist();
    }, [id]);

    useEffect(() => {
        return () => {
            if (playingAudio) {
                playingAudio.pause();
                playingAudio.currentTime = 0;
            }
        }
    }, [playingAudio]);

    const handleNewAudio = (newAudio: HTMLAudioElement, title: string, song: SearchTypes) => {
        if (playingAudio && playingAudio !== newAudio) {
            playingAudio.pause();
            playingAudio.currentTime = 0;
        }
        // newAudio.play();
        setPlayingAudio(newAudio);
        setTitle(title);

        const selected: selectedSongs = {
            artist: song.artist,
            title: song.title,
            audio: song.audio,
            duration: song.duration || 0,
            id: song.id,
            image: song.image,
        };
        setCurrentSong(selected);
    };

    return (
        <section className="relative flex px-30 xl:flex-col xl:gap-10 max-sm:flex-col max-sm:px-0 max-sm:min-h-[100svh] md:min-h-[100svh] md:flex-col">

            {/* Blurred background */}
            {artistData?.image && (
                <figure
                    className="fixed inset-0 bg-cover bg-no-repeat blur-[10px] max-sm:bg-center md:bg-center xl:bg-center"
                    style={{ backgroundImage: `url(${artistData.image})` }}
                ></figure>
            )}

            {/* Artist Image & Name */}
            {artistData && (
                <div>
                    <figure className="relative top-30 flex flex-row-reverse items-end gap-2 max-sm:flex-col max-sm:items-center">
                        <img
                            className="xl:w-[384px] rounded-2xl shadow-sm max-sm:w-11/12 shadow-cream md:w-1/4"
                            src={artistData.image}
                            alt=""
                        />
                        <div className='flex flex-col p-3 max-sm:flex-row md:flex-col-reverse xl:flex-col'>
                            {artistState.length > 0 && (

                                <motion.button
                                    whileTap={{ rotate: 90, scale: 1.2 }}

                                    className="w-19 h-19 text-cream flex justify-center items-center cursor-pointer hover:text-white p-1.5 border-2 rounded-full max-sm:w-10 max-sm:h-10 md:hidden xl:block"
                                    onClick={() => {
                                        const selected = artistState.map((song: selectedSongs) => ({
                                            id: song.id,
                                            title: song.title,
                                            audio: song.audio,
                                            image: song.image,
                                            artist: song.artist,
                                            duration: song.duration
                                        }))
                                        // setSelectedSongs(selected)
                                        setCurrentSong(selected[0])
                                    }}>
                                    <BiPlay className="w-15 h-15 max-sm:w-7 max-sm:h-7" />
                                </motion.button>
                            )

                            }
                            <aside className="flex flex-col max-sm:flex-col-reverse">
                                <figcaption className="text-transparent flex justify-end bg-gradient-to-r from-white to-cream bg-clip-text max-sm:text-sm max-sm:ml-6">
                                    {artistData.genre}
                                </figcaption>

                                <figcaption className="bg-clip-text text-transparent bg-gradient-to-r from-cream to-white text-center xl:text-4xl max-sm:text-sm md:text-2xl">
                                    {artistData.title}
                                </figcaption>
                            </aside>
                        </div>
                    </figure>
                </div>
            )}

            {/* Song List */}
            <aside className="w-3/4 flex flex-col gap-4 py-30 relative max-sm:w-full max-sm:top-20 md:w-full md:top-30 xl:top-0">
                {artistState.map((element, index) => (
                    <PlaylistItem
                        key={element.id}
                        S_no={index + 1}
                        duration={element.duration}
                        title={element.title}
                        image={element.image}
                        audio={element.audio}
                        artist={element.artist}
                        isCurrent={isTitle === element.title}
                        onAudioPlay={(audio) => handleNewAudio(audio, element.title, element)}
                        onSelect={(song, isChecked) => {
                            const songSet = {
                                title: song.title,
                                audio: element.audio,
                                image: element.image,
                            };
                            setSelectedSongs((prev) =>
                                isChecked ? [...prev, songSet] : prev.filter((s) => s.audio !== songSet.audio)
                            );
                        }}
                    />
                ))}
            </aside>
        </section>
    );
};

export default ArtistsPage;
