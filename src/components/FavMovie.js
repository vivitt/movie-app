import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthenticationProv";
import style from "./Movies.module.css";
import { Button } from "@mui/material";
import Grid from "@mui/material/Grid";
import { Item } from "./Item";
import { useFavContext } from "../context/FavContextProv";
import { Favorite } from "@mui/icons-material";

function FavMovie({ item, setMssg, setTitle, setOpenMessage }) {
  const activeUser = useAuth();
  const navigate = useNavigate();
  const userFavs = useFavContext();

  function removeFromFavs(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(
      `${process.env.REACT_APP_API}/api/users/removefavorites/${item.title}`,
      requestOptions
    )
      .then((res) => res.json())
      .then((data) => {
        // if (userFavs.favMovies.length === 1) {
        //   userFavs.setFavMovies([
        //     {
        //       category: "",
        //       poster: "",
        //       title: "",
        //       plot: "",
        //       year: "",
        //       rating: "",
        //     },
        //   ]);
        // } else {
        userFavs.setFavMovies(
          userFavs.favMovies.filter((item) => item.title !== data.title)
        );
      })
      .catch((error) => console.log(error));
    setOpenMessage(true);
    setMssg(`${item.title} removed from favs.`);
    setTitle(`${item.title}`);
  }

  return (
    <>
      <Grid item xs="9">
        <Item>
          <div className={style.movieItemBig}>
            <div className={style.movieImg}>
              <img src={item.poster} alt={item.title} />
            </div>
            <div className={style.movInfo}>
              <span>
                <h2>{item.title}</h2>
                <Button
                  onClick={removeFromFavs}
                  title="Remove this movie from favs"
                >
                  {" "}
                  <Favorite sx={{ color: "#FE0D13" }}></Favorite>{" "}
                </Button>
              </span>
              <div>
                <p>{item.plot}</p>
              </div>
              <div>
                <p>{item.year}</p>
                <p>
                  <i>{item.category}</i> &ensp; |&ensp; ★ {item.rating}
                </p>
              </div>
            </div>
          </div>
        </Item>
      </Grid>
    </>
  );
}

export default FavMovie;
