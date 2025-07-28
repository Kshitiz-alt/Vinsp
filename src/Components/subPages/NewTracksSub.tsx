import { useTranslation } from "react-i18next";
import type { OutletContextType, SearchTypes, selectedSongs, songsProps } from "../../types";
import { useOutletContext } from "react-router-dom";
import { motion } from "framer-motion";

const NewTracksSub = ({ playlists }: songsProps) => {
  const { t } = useTranslation();
  const { setCurrentSong } = useOutletContext<OutletContextType>();

  const handlePlay = (song: SearchTypes) => {
    const selected: selectedSongs = {
      artist: song.artist,
      title: song.title,
      audio: song.audio,
      id: song.id,
      image: song.image,
      lyrics: song.lyrics,
    };

    setCurrentSong(selected);
  };

  return (
    <section className="w-full overflow-hidden rounded-3xl py-6 max-sm:px-2">
      <div className="flex justify-between items-center max-sm:bg-cream/40 max-sm:p-1 rounded-[5px] mb-4">
        <h1 className="text-white text-3xl max-sm:text-lg">{t("newTracks")}</h1>
      </div>

      <div className="flex gap-3.5 overflow-x-auto p-2">
        {playlists.map((track) => (
          <motion.div
            key={track.id}
            className="xl:w-[260px] xl:h-[250px] md:w-[280px] md:h-[180px] max-sm:w-35 max-sm:h-35 rounded-xl overflow-hidden shadow-lg flex-shrink-0 cursor-pointer bg-Gray/20 p-1"
            whileHover={{ scale: 1.05 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => handlePlay(track)}
          >
            <img
              src={track.image}
              alt="songImage"
              className="w-full h-full object-cover object-center rounded-xl"
            />
          </motion.div>
        ))}
      </div>
    </section>
  );
};

export default NewTracksSub;
