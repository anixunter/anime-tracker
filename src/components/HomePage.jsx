import { useState } from "react";
import SearchList from "./SearchList";
import Search from "./Search";
import AnimeList from "./AnimeList";
import Logout from "./Logout";

const HomePage = ({ animesOfUser, userId, userData, setIsLoggedIn }) => {
  const [animes, setAnimes] = useState([]);
  const [addAnime, setAddAnime] = useState(animesOfUser);
  const [inputData, setInputData] = useState("");
  const [loading, setLoading] = useState(false);

  return (
    <>
      <Logout setIsLoggedIn={setIsLoggedIn} />
      <Search
        setAnimes={setAnimes}
        inputData={inputData}
        setInputData={setInputData}
        setLoading={setLoading}
      />
      <SearchList
        animes={animes}
        setAnimes={setAnimes}
        userId={userId}
        addAnime={addAnime}
        setAddAnime={setAddAnime}
        setInputData={setInputData}
        loading={loading}
      />
      <AnimeList
        addAnime={addAnime}
        setAddAnime={setAddAnime}
        userId={userId}
        userData={userData}
      />
    </>
  );
};

export default HomePage;
