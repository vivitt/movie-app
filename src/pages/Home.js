import SearchBar from "../components/SearchBar";
import UserMssg from "../components/UserMssg";
import { useFavContext } from "../context/FavContextProv";
import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthenticationProv";
import AllTheMovies from "../components/AllTheMovies";

const Home = ({ openMessage, setOpenMessage, mssg, setMssg }) => {
  //USER
  const { authData } = useAuth();
  const userName = authData.name;
  //const userName = authData.name.charAt(0).toUpperCase() + authData.name.slice(1);

  //MOVIES
  const [movies, setMovies] = useState([]);
  const [filtMovies, setFiltMovies] = useState([]);
  const [dataMovies, setDataMovies] = useState([]);
  const [back, setBack] = useState(false);

  const userFavs = useFavContext();

  const getMovies = () => {
    fetch(`${process.env.REACT_APP_API}/api/movies`)
      .then((response) => response.json())
      .then((data) => {
        console.log(data);
        setMovies(data.movies);
        setFiltMovies(data.movies);
        setDataMovies(data.movies);
        setBack(false); //allTheMovies BTN
      })

      .catch((err) => console.log(err));
  };

  useEffect(() => {
    getMovies();
  }, []);

  useEffect(() => {
    userFavs.getFavs();
  }, []);

  const backToAll = (event) => {
    event.preventDefault();
    setFiltMovies([...dataMovies]);
    setBack(false);
  };
  return (
    <>
      {userName && (
        <UserMssg
          openMessage={openMessage}
          setOpenMessage={setOpenMessage}
          mssg={mssg}
          setMssg={setMssg}
        ></UserMssg>
      )}

      <SearchBar
        setFiltMovies={setFiltMovies}
        filtMovies={filtMovies}
        movies={movies}
        setMovies={setMovies}
        dataMovies={dataMovies}
        setBack={setBack}
      />

      <AllTheMovies
        back={back}
        setBack={setBack}
        backToAll={backToAll}
        filtMovies={filtMovies}
        movies={movies}
      />
    </>
  );
};

export default Home;
