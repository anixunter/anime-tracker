const Search = ({ setAnimes, inputData, setInputData, setLoading }) => {
  const handleInputChange = (event) => {
    if (!event.target.value) setAnimes([]);
    setInputData(event.target.value);
  };
  const handleSearch = async (event) => {
    event.preventDefault();
    setLoading(true);
    try {
      const response = await fetch(
        `https://api.jikan.moe/v4/anime?q=${inputData}&type=tv&limit=4`
      );
      const fetchedData = await response.json();
      const filteredData = fetchedData.data.filter(
        (anime) => anime.status !== "Not yet aired"
      ); // had to filter out the upcoming not yet aired animes, cuz it was duplicating the data and messsing with key
      setLoading(false);
      setAnimes(filteredData);
    } catch (error) {
      console.log("Error fetching animes", error);
      setLoading(false);
    }
  };
  return (
    <form className="search" onSubmit={handleSearch}>
      <input
        type="text"
        value={inputData}
        onChange={handleInputChange}
        placeholder="Search anime..."
      />
      <button className="button search-button" type="submit">
        Search
      </button>
    </form>
  );
};

export default Search;
