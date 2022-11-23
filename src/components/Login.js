import * as React from "react";
import Button from "@mui/material/Button";
import Dialog from "@mui/material/Dialog";
import DialogActions from "@mui/material/DialogActions";
import DialogContent from "@mui/material/DialogContent";
import Link from "@mui/material/Link";
import DialogContentText from "@mui/material/DialogContentText";
import DialogTitle from "@mui/material/DialogTitle";
import CloseIcon from "@mui/icons-material/Close";
import { useState } from "react";
import { useAuth } from "../context/AuthenticationProv";
import { PaperComponent } from "./PaperComponent";
import IconButton from "@mui/material/IconButton";
import OutlinedInput from "@mui/material/OutlinedInput";
import InputLabel from "@mui/material/InputLabel";
import InputAdornment from "@mui/material/InputAdornment";
import FormControl from "@mui/material/FormControl";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = ({
  setLogin,
  setRegister,
  open,
  setOpen,
  setOpenMessage,
  setMssg,
}) => {
  ////  password visibility icon
  const [showPassword, setShowPassword] = useState();
  const handleShowPass = (e) => {
    e.preventDefault();
    showPassword ? setShowPassword(false) : setShowPassword(true);
  };
  ///user
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const { authData } = useAuth();
  // const navigate = useNavigate();
  const { onLogin } = useAuth();

  //close dialog
  const handleClose = () => {
    setOpen(false);
  };

  //login func
  function logInUser(event) {
    event.preventDefault();
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: email, password: password }),
    };
    fetch(`${process.env.REACT_APP_API}/api/auth/login`, requestOptions)
      .then((response) =>
        response
          .json()

          .then((data) => {
            onLogin({ email: data.email, name: data.name });
            // navigate('/', {replace: true})
            setEmail("");
            setPassword("");
            if (response.status === 200) {
              setLogin(false);

              setMssg(
                `Hi ${
                  data.name.charAt(0).toUpperCase() + data.name.slice(1)
                }, welcome to MovieApp :)`
              );
              setOpenMessage(true);
            }
          })
      )
      .catch((err) => console.log(err));
  }

  //register link
  const showRegister = () => {
    setLogin(false);
    setRegister(true);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        PaperComponent={PaperComponent}
        aria-labelledby="draggable-dialog-title"
      >
        <DialogTitle style={{ cursor: "move" }} id="draggable-dialog-title">
          Login
        </DialogTitle>
        <DialogContent>
          <DialogContentText>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="email">Email</InputLabel>
              <OutlinedInput
                id="email"
                required
                type="text"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                label="email"
              />
            </FormControl>
          </DialogContentText>
          <DialogContentText>
            <FormControl sx={{ m: 1 }} variant="outlined">
              <InputLabel htmlFor="password">Password</InputLabel>
              <OutlinedInput
                id="password"
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                endAdornment={
                  <InputAdornment position="end">
                    <IconButton
                      aria-label="toggle password visibility"
                      onClick={handleShowPass}
                      // onMouseDown={handleMouseDownPassword}
                      edge="end"
                    >
                      {showPassword ? <VisibilityOff /> : <Visibility />}
                    </IconButton>
                  </InputAdornment>
                }
                label="password"
              />
            </FormControl>
          </DialogContentText>
          <DialogContentText>
            <Button variant="contained" type="submit" onClick={logInUser}>
              Login
            </Button>
            <p>
              Not resgistered yet?...Please register{" "}
              <Link color="secondary" onClick={showRegister}>
                here
              </Link>
            </p>
          </DialogContentText>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose} color="secondary">
            <CloseIcon></CloseIcon>{" "}
          </Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default Login;
