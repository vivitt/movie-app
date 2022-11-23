import { useState, useEffect } from "react";
import FavMovie from "../components/FavMovie";
import { useAuth } from "../context/AuthenticationProv";
import { useFavContext } from "../context/FavContextProv";
import Title from "../components/Title";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import Message from "../components/Message";
import ArrowBackIosIcon from "@mui/icons-material/ArrowBackIos";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";

const UserFavs = ({ openMessage, setOpenMessage, mssg, setMssg }) => {
  //user context
  let { authData } = useAuth();
  const userName =
    authData.name.charAt(0).toUpperCase() + authData.name.slice(1);
  //FAV MOVIES
  const userFavs = useFavContext();
  const [title, setTitle] = useState("");
  const navigate = useNavigate();
  const backToAll = (event) => {
    event.preventDefault();
    navigate("/");
  };
  function addToFavs(event, handleClose) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`/api/users/favorites/${title}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        userFavs.getFavs();
      })
      .catch((error) => console.log(error));
    handleClose();
  }

  useEffect(() => {
    userFavs.getFavs();
  }, []);

  return (
    <>
      <Message
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        mssg={mssg}
        setMssg={setMssg}
        addToFavs={addToFavs}
      ></Message>
      <Title text={`${userName} favs movies ❤️`} />

      <Box sx={{ flexGrow: 1 }}>
        {userFavs.favMovies[0].title !== "" ? (
          <>
            <Grid
              container
              direction="row"
              justifyContent="space-evenly"
              alignItems="center"
              spacing={3}
            >
              {userFavs.favMovies.map((item) => (
                <FavMovie
                  title={title}
                  setTitle={setTitle}
                  item={item}
                  openMessage={openMessage}
                  setOpenMessage={setOpenMessage}
                  mssg={mssg}
                  setMssg={setMssg}
                />
              ))}
            </Grid>
          </>
        ) : (
          <>
            <div className="noFavMssg">
              <p>You don't have favorite movies yet... </p>
            </div>
          </>
        )}
      </Box>
      <div className="backBtn">
        <Button variant="contained" onClick={backToAll}>
          {" "}
          <ArrowBackIosIcon></ArrowBackIosIcon>All the movies
        </Button>
      </div>
    </>
  );
};

export default UserFavs;
