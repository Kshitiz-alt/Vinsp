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
import Loader from '../../Components/subComponents/Animations/Loader';

const ArtistsPage = () => {
    const { id } = useParams<{ id: string }>();
    const [artistState, setArtistState] = useState<artistStateTypes[]>([]);
    const [artistData, setArtistData] = useState<ArtistDataTypes | null>(null);
    const [loading,setLoading] = useState(true)
    const [playingAudio, setPlayingAudio] = useState<HTMLAudioElement>();
    const [isTitle, setTitle] = useState<string | null>(null);

    const { setSelectedSongs, setCurrentSong } = useOutletContext<OutletContextType>();

    useEffect(() => {
        const fetchArtist = async () => {
            if (!id) return;
            setLoading(true)
            try{

                const data = await ARTISTS(Number(id));
                if (data) {
                    console.log(data.songs.rows)
                    setArtistData(data.rows[0]);
                    setArtistState(data.songs.rows || []);
                }
            }catch(err){
                console.error("error while fetching artists",err)

            }finally{
                setLoading(false)
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
            lyrics: song.lyrics
        };
        setCurrentSong(selected);
    };
  
  if (loading) {
    return (
      <section className="h-[96.8svh] max-sm:min-w-0 w-full">
        <figure className="h-full flex justify-center items-center text-white ">
          <Loader/>
        </figure>
      </section>
    )
  }

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
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    exit={{ opacity: 0 }}
                    transition={{ duration: 2.5, ease: "easeInOut" }}
                >
                    <figure className="relative top-30 flex flex-row-reverse items-end gap-2 max-sm:flex-col max-sm:items-center">
                        <img
                            className="xl:w-[384px] rounded-2xl shadow-sm max-sm:w-11/12 shadow-cream md:w-1/4"
                            src={artistData.image}
                            alt=""
                        />
                        <div className='flex flex-col p-3 max-sm:flex-row max-sm:gap-3 md:flex-col-reverse xl:flex-col'>
                            <div className='flex gap-4 justify-end'>

                                {artistState.length > 0 && (

                                    <motion.button
                                        whileTap={{ rotate: 90, scale: 1.05 }}

                                        className="w-12.5 text-darkcream flex justify-center items-center text-sm cursor-pointer bg-white/30 hover:bg-white/40 p-4 border-2 rounded-full md:hidden xl:block"
                                        onClick={() => {
                                            const selected = artistState.map((song: selectedSongs) => ({
                                                id: song.id,
                                                title: song.title,
                                                audio: song.audio,
                                                image: song.image,
                                                artist: song.artist,
                                                duration: song.duration,
                                                lyrics: song.lyrics
                                            }))
                                            setSelectedSongs(selected)
                                            setCurrentSong(selected[0])
                                        }}>
                                        <BiPlay width={30} height={30} />
                                    </motion.button>
                                )

                                }

                            </div>
                            <aside className="flex flex-col max-sm:flex-col-reverse max-sm:self-center">
                                <figcaption className="text-transparent flex justify-end bg-gradient-to-r from-white to-cream bg-clip-text max-sm:text-[10px] max-sm:justify-start">
                                    {artistData.genre}
                                </figcaption>

                                <figcaption className="bg-clip-text text-transparent bg-gradient-to-r from-cream to-white text-center xl:text-4xl max-sm:text-sm md:text-2xl">
                                    {artistData.title}
                                </figcaption>
                            </aside>
                        </div>
                    </figure>
                </motion.div>
            )}

            {/* Song List */}
            <motion.aside
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: 2.5, ease: "easeInOut" }}
                className="w-3/4 flex flex-col gap-4 py-30 relative max-sm:w-full max-sm:top-20 md:w-full md:top-30 xl:top-0">
                {artistState.map((element, index) => (
                    <PlaylistItem
                        key={element.id}
                        S_no={index + 1}
                        duration={element.duration}
                        title={element.title}
                        lyrics={element.lyrics}
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
                                lyrics: song.lyrics
                            };
                            setSelectedSongs((prev) =>
                                isChecked ? [...prev, songSet] : prev.filter((s) => s.audio !== songSet.audio)
                            );
                        }}
                    />
                ))}
            </motion.aside>
        </section>
    );
};

export default ArtistsPage;
