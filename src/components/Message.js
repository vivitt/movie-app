import * as React from "react";
import Button from "@mui/material/Button";
import Snackbar, { SnackbarOrigin } from "@mui/material/Snackbar";
import IconButton from "@mui/material/IconButton";
import CloseIcon from "@mui/icons-material/Close";
import { useFavContext } from "../context/FavContextProv";

export default function Message({
  addToFavs,
  mssg,
  setMssg,
  openMessage,
  setOpenMessage,
}) {
  const userFavs = useFavContext();
  const [state, setState] = React.useState({
    open: true,
    vertical: "top",
    horizontal: "center",
  });
  const { vertical, horizontal, open } = state;
  const handleClose = (
    event: React.SyntheticEvent | Event,
    reason?: string
  ) => {
    if (reason === "clickaway") {
      return;
    }
    setOpenMessage(false);
    setMssg("");
  };

  const action = (
    <React.Fragment>
      <Button color="primary" size="small" onClick={addToFavs}>
        UNDO
      </Button>
      <IconButton
        size="small"
        aria-label="close"
        color="inherit"
        onClick={handleClose}
      >
        <CloseIcon fontSize="small" />
      </IconButton>
    </React.Fragment>
  );

  return (
    <div>
      <Snackbar
        anchorOrigin={{ vertical, horizontal }}
        key={vertical + horizontal}
        open={openMessage}
        autoHideDuration={6000}
        onClose={handleClose}
        message={mssg}
        action={action}
      />
    </div>
  );
}
