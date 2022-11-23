import * as React from "react";
import { useNavigate } from "react-router-dom";
import Button from "@mui/material/Button";
import Login from "./Login";
import Register from "./Register";
import { useState } from "react";
import { useAuth } from "../context/AuthenticationProv";
import PersonIcon from "@mui/icons-material/Person";
import LogoutIcon from "@mui/icons-material/Logout";
import UserMssg from "./UserMssg";

function UserButton({ setOpenMessage, setMssg, mssg, openMessage }) {
  const [open, setOpen] = React.useState(false);
  //LOGIN-REGISTER
  const [login, setLogin] = useState(false);
  const [register, setRegister] = useState(false);

  // const navigate = useNavigate();
  const { authData } = useAuth();
  const { setAuthData } = useAuth();

  function logOut(event) {
    event.preventDefault();
    const requestOptions = {
      method: "GET",
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };
    fetch("/api/auth/logout", requestOptions).then((res) => {
      if (res.status === 200) {
        setMssg(
          `Bye ${
            authData.name.charAt(0).toUpperCase() + authData.name.slice(1)
          }, see you soon!`
        );
        setOpenMessage(true);
        setAuthData({ name: "", email: "" });
      }
    });
  }

  const logIn = () => {
    login ? setLogin(false) : setLogin(true);
  };

  return (
    <>
      <UserMssg
        openMessage={openMessage}
        setOpenMessage={setOpenMessage}
        mssg={mssg}
        setMssg={setMssg}
      ></UserMssg>
      {!authData.name ? (
        <Button
          className="user-button"
          color="secondary"
          onClick={() => logIn()}
        >
          Login <PersonIcon></PersonIcon>
        </Button>
      ) : (
        <Button
          color="secondary"
          className="user-button"
          onClick={(e) => logOut(e)}
        >
          Logout <LogoutIcon></LogoutIcon>
        </Button>
      )}
      {login && (
        <Login
          setLogin={setLogin}
          setRegister={setRegister}
          open={login}
          setOpen={setLogin}
          setOpenMessage={setOpenMessage}
          setMssg={setMssg}
        />
      )}

      {register && (
        <Register
          setLogin={setLogin}
          setRegister={setRegister}
          open={register}
          setOpen={setRegister}
        />
      )}
    </>
  );
}
export default UserButton;
