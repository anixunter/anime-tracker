const AnimeList = ({ addAnime, setAddAnime, userId, userData }) => {
  const updateAnimeInDatabase = async (updatedAnime) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/animes/${
          updatedAnime.anime_id
        }`,
        {
          method: "PUT",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(updatedAnime),
        }
      );
      if (!response.ok) {
        throw new Error("Failed to update anime");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.error(err.message);
    }
  };
  const handleDeleteAnime = async (anime) => {
    try {
      const response = await fetch(
        `${import.meta.env.VITE_API_URL}/users/${userId}/animes/${
          anime.anime_id
        }`,
        {
          method: "DELETE",
        }
      );
      if (!response.ok) {
        throw new Error("Failed to delete anime");
      }
      const data = await response.json();
      console.log(data.message);
    } catch (err) {
      console.error(err.message);
    }
    setAddAnime((prev) => prev.filter((a) => a.mal_id !== anime.mal_id)); //deleting an anime in V-DOM
  };
  const handleIncreaseEpisode = async (anime) => {
    const updatedAnime = {
      ...anime,
      watched_episodes: anime.watched_episodes + 1,
    };
    await updateAnimeInDatabase(updatedAnime);
    setAddAnime((prev) =>
      prev.map((existingAnime) =>
        existingAnime.mal_id === anime.mal_id ? updatedAnime : existingAnime
      )
    ); //for updating in V-dom
  };
  const handleDecreaseEpisode = async (anime) => {
    const updatedAnime = {
      ...anime,
      watched_episodes: anime.watched_episodes - 1,
    };
    await updateAnimeInDatabase(updatedAnime);
    setAddAnime((prev) =>
      prev.map((existingAnime) =>
        existingAnime.mal_id === anime.mal_id ? updatedAnime : existingAnime
      )
    ); //for updating in V-dom
  };
  return (
    <div className="anime-list-container">
      <h3>{userData.toUpperCase()} animes</h3>
      <div className="anime-list">
        {addAnime.map((anime) => (
          <div key={anime.mal_id} className="anime-list-card">
            <img src={anime.image_url} alt={anime.title.slice(0, 10)} />
            <h4>{anime.title_english ? anime.title_english : anime.title}</h4>
            <div>
              <span id="watched-track">Watched: </span>
              <span id="watched-episode">{anime.watched_episodes}</span>
              <span id="slash">/</span>
              <span id="total-episode">{anime.total_episodes}</span>
            </div>
            <div className="watched-buttons">
              {anime.watched_episodes !== parseInt(anime.total_episodes) && (
                <button
                  onClick={() => handleIncreaseEpisode(anime)}
                  className="button add-button"
                >
                  +
                </button>
              )}
              {anime.watched_episodes > 0 && (
                <button
                  onClick={() => handleDecreaseEpisode(anime)}
                  className="button sub-button"
                >
                  -
                </button>
              )}
            </div>
            <button
              onClick={() => handleDeleteAnime(anime)}
              className="button del-button"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AnimeList;
