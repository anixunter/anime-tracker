import AnimeCard from "./AnimeCard";

const SearchList = ({
  animes,
  setAnimes,
  userId,
  addAnime,
  setAddAnime,
  setInputData,
  loading,
}) => {
  function handleSearchClose() {
    setInputData("");
    setAnimes([]);
  }
  if (loading) {
    return <div className="loader search-loader"></div>;
  }
  return (
    <div className="search-anime-list">
      {animes && animes.length > 0 && (
        <button
          className="button close-search-button"
          onClick={handleSearchClose}
        >
          Close
        </button>
      )}
      {animes.map((anime) => (
        <AnimeCard
          key={anime.mal_id}
          userId={userId}
          anime={anime}
          addAnime={addAnime}
          setAddAnime={setAddAnime}
          setAnimes={setAnimes}
          setInputData={setInputData}
        />
      ))}
    </div>
  );
};

export default SearchList;
