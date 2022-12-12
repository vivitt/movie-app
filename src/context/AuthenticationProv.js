import React, { useContext, useEffect, useState } from "react";
import { useLoader } from "./LoadContext";
const AuthenContext = React.createContext("");

const AuthenticationProv = ({ children }) => {
  const [authData, setAuthData] = useState({
    email: "",
    name: "",

    favMovies: "",
  });
  const { setLoading } = useLoader();

  function getLogUser() {
    const requestOptions = {
      credentials: "include",
      headers: { "Content-Type": "application/json" },
    };

    fetch(`${process.env.REACT_APP_API}/api/auth/`, requestOptions)
      .then((response) => response.json())
      .then((data) => {
        if (data.email) {
          onLogin(data);

          setLoading(false);
        }
        setLoading(false);
      })

      .catch((error) => {
        console.log(error);
        return null;
      });
  }

  useEffect(() => {
    getLogUser();
  }, [setLoading]);

  const onLogin = (value) => setAuthData(value);
  const onLogout = () => setAuthData({});

  const value = {
    authData,
    setAuthData,
    onLogin,
    onLogout,
  };

  return (
    <AuthenContext.Provider value={value}>{children}</AuthenContext.Provider>
  );
};

export default AuthenticationProv;
export const useAuth = () => useContext(AuthenContext);
