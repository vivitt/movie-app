import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthenticationProv";
import InfoMovie from "./InfoMovie";
import style from "./Movies.module.css";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Item } from "./Item";

import { useFavContext } from "../context/FavContextProv";
import { Favorite, FavoriteBorder } from "@mui/icons-material";
function Movie({ item, openMovInf, setOpenMovInf }) {
  const activeUser = useAuth();
  const userFavs = useFavContext();
  const navigate = useNavigate();
  const [infoMovie, setInfoMovie] = useState({
    category: "",
    poster: "",
    title: "",
    plot: "",
    year: "",
    rating: "",
  });
  function toggleInfo() {
    setInfoMovie({
      category: "",
      poster: "",
      title: "",
      plot: "",
      year: "",
      rating: "",
    });
    if (openMovInf.length < 1 || item.title !== openMovInf[0].title) {
      setInfoMovie({
        category: item.category,
        poster: item.poster,
        title: item.title,
        plot: item.plot,
        year: item.year,
        rating: item.rating,
      });
      setOpenMovInf([item]);
    } else {
      setOpenMovInf([
        { category: "", poster: "", title: "", plot: "", year: "", rating: "" },
      ]);
      setInfoMovie({
        category: "",
        poster: "",
        title: "",
        plot: "",
        year: "",
        rating: "",
      });
    }
  }
  function addToFavs(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${process.env.REACT_APP_API}/api/users/favorites/${item.title}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        userFavs.getFavs();
      })
      .catch((error) => console.log(error));
  }

  function removeFromFavs(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/users/removefavorites/${item.title}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        userFavs.getFavs();
      })
      .catch((error) => console.log(error));
  }

  return (
    <>
      {item.title === openMovInf[0].title ? (
        <Grid item xs="10" sm="9" md="6" lg="6" xl="6">
          <Item>
            <div className={style.movieItemBig}>
              <Button onClick={toggleInfo} className={style.movieBtn}>
                <div className={style.movieImg}>
                  <img src={item.poster} alt={item.title} />
                </div>
              </Button>

              <div className={style.movInfo}>
                <InfoMovie movie={item}></InfoMovie>
                {activeUser.authData.name && (
                  <div className={style.favBtn}>
                    {userFavs.favMovies.some((x) => x.title === item.title) ? (
                      <Button onClick={removeFromFavs}>
                        {" "}
                        <Favorite
                          sx={{
                            color: "#FE0D13",
                          }}
                        ></Favorite>{" "}
                      </Button>
                    ) : (
                      <Button color="secondary" onClick={addToFavs}>
                        {" "}
                        <FavoriteBorder></FavoriteBorder>{" "}
                      </Button>
                    )}
                  </div>
                )}
              </div>
            </div>
          </Item>
        </Grid>
      ) : (
        <Grid item xs="auto">
          <Item>
            <div className={style.movieItemSmall}>
              <Button onClick={toggleInfo} className={style.movieBtn}>
                <div className={style.movieImg}>
                  <img src={item.poster} alt={item.title} />
                </div>
              </Button>
              {activeUser.authData.name && (
                <div>
                  {userFavs.favMovies.some((x) => x.title === item.title) ? (
                    <Button onClick={removeFromFavs}>
                      {" "}
                      <Favorite
                        sx={{
                          color: "#FE0D13",
                        }}
                      ></Favorite>{" "}
                    </Button>
                  ) : (
                    <Button color="secondary" onClick={addToFavs}>
                      {" "}
                      <FavoriteBorder></FavoriteBorder>{" "}
                    </Button>
                  )}{" "}
                </div>
              )}
            </div>
          </Item>
        </Grid>
      )}
    </>
  );
}

export default Movie;
