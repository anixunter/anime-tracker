const AnimeCard = ({
  userId,
  anime,
  addAnime,
  setAddAnime,
  setAnimes,
  setInputData,
}) => {
  const addAnimeInDatabase = async (newAnime) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/animes`,
        {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(newAnime),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to add anime");
      }
      const data = await response.json();
      //get animeId from backend to update in the addAnime state and for querying
      const newAnimeWithId = { ...newAnime, anime_id: data.animeId };
      setAddAnime([...addAnime, newAnimeWithId]);
      console.log(data.message);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleAddAnime = (anime) => {
    setAnimes([]); // to clear the search anime data so that when new search it doesn't show the previous results for a fraction of second when fetching new search data
    setInputData(""); // to clear the search input
    const isDuplicate = addAnime.some(
      (existingAnime) => existingAnime.mal_id === anime.mal_id
    );
    if (isDuplicate) {
      console.log("Anime already exists");
      return;
    } // for preventing adding of already existing anime in the list
    const newAnime = {
      mal_id: anime.mal_id,
      title: anime.title,
      title_english: anime.title_english,
      image_url: anime.images.webp.image_url,
      watched_episodes: 0,
      total_episodes: anime.episodes == null ? "Ongoing" : anime.episodes,
    };
    addAnimeInDatabase(newAnime);
  };
  return (
    <div className="anime-card">
      <img src={anime.images.webp.image_url} alt={anime.title.slice(0, 10)} />
      <div className="anime-details">
        <h3>{anime.title_english ? anime.title_english : anime.title}</h3>
        <p>{anime.synopsis?.slice(0, 150)}...</p>
        <button
          className="button add-button"
          onClick={() => handleAddAnime(anime)}
        >
          Add anime
        </button>
      </div>
    </div>
  );
};

export default AnimeCard;
