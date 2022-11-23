import { useState, useEffect } from "react";
import { useAuth } from "../context/AuthenticationProv";
import { useFavContext } from "../context/FavContextProv";
import Title from "../components/Title";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import OutlinedInput from "@mui/material/OutlinedInput";
import FormControl from "@mui/material/FormControl";
import { Typography } from "@mui/material";
import Avatar from "@mui/material/Avatar";

const UserProfile = () => {
  //user context
  let { authData } = useAuth();
  const [userName, setUserName] = useState(
    authData.name.charAt(0).toUpperCase() + authData.name.slice(1)
  );
  //FAV MOVIES
  const userFavs = useFavContext();
  const [title, setTitle] = useState("");
  const [name, setName] = useState("");
  const [file, setFile] = useState("");
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState();
  function changeName(event) {
    event.preventDefault();
    const requestOptions = {
      method: "PUT",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch(`${process.env.REACT_APP_API}/api/users/${name}`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        setUserName(data.name.charAt(0).toUpperCase() + data.name.slice(1));
      })
      .catch((error) => console.log(error));
  }

  function uploadImg(event) {
    event.preventDefault();

    const requestOptions = {
      method: "POST",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ file: file }),
    };
    fetch(`/api/users/image`, requestOptions)
      .then((res) => res.json())
      .then((data) => {
        console.log("uplo");
        console.log(data, "data from frontend");
      })
      .catch((error) => console.log(error));
  }
  return (
    <div className="userInfo">
      <Avatar
        sx={{ width: 100, height: 100 }}
        src="/static/images/avatar/1.jpg"
      >
        {" "}
        {userName.charAt(0)}
      </Avatar>
      <Title text={`${userName} profile info`} />

      <FormControl sx={{ m: 1 }} variant="outlined">
        <Typography>Name:</Typography>
        <OutlinedInput
          id="name"
          required
          type="text"
          value={name}
          onChange={(event) => {
            setName(event.target.value);
          }}
          placeholder={userName}
          size="small"
        />
      </FormControl>
      <Button variant="contained" type="submit" onClick={changeName}>
        Change Name
      </Button>

      <FormControl sx={{ m: 1 }} variant="outlined">
        <div>
          <Typography>Email:</Typography>
          <OutlinedInput
            id="email"
            required
            type="email"
            value={authData.email}
            //  onChange={(event) => {setName(event.target.value)}}
            placeholder={authData.email}
            size="small"
            disabled
          />
        </div>
      </FormControl>
      <FormControl sx={{ m: 1 }} variant="outlined">
        <div>
          <Typography>Profile image:</Typography>
          <OutlinedInput
            id="avatar"
            required
            accept=".png, .jpg, .jpeg"
            type="file"
            value={file}
            onChange={(event) => {
              setFile(event.target.value);
            }}
            placeholder={userName}
            size="small"
            encType="multipart/form-data"
          />
        </div>
      </FormControl>
      <Button variant="contained" type="submit" onClick={uploadImg}>
        Upload
      </Button>
    </div>
  );
};

export default UserProfile;
