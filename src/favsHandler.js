export function addToFavs(event, title, userFavs, handleClose) {
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
