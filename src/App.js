import * as React from "react";
import {
  BrowserRouter as Router,
  NavLink,
  Route,
  Routes,
} from "react-router-dom";
import Home from "./pages/Home";
import NavBar from "./components/NavBar";
import Container from "@mui/material/Container";
import NotFound from "./pages/NotFound";
import Footer from "./components/Footer";
import { FavContextProv } from "./context/FavContextProv";
import UserFavs from "./pages/UserFavs";
import RequireAuth from "./context/RequireAuth";
import AuthenticationProv from "./context/AuthenticationProv";
import Loader from "./components/Loader";
import { useLoader } from "./context/LoadContext";

import { useState } from "react";
import { ThemeProvider } from "@emotion/react";
import { useTheme } from "./context/ThemeContext";

import Paper from "@mui/material/Paper";
import UserProfile from "./pages/UserProfile";
function App() {
  //Loader
  const [openMessage, setOpenMessage] = useState(false);
  const [mssg, setMssg] = useState("");
  const { loading } = useLoader();
  const modeTheme = useTheme();

  return (
    <ThemeProvider theme={modeTheme}>
      <Paper>
        <div className="app">
          <Router>
            <AuthenticationProv>
              <NavBar
                mssg={mssg}
                setMssg={setMssg}
                openMessage={openMessage}
                setOpenMessage={setOpenMessage}
              ></NavBar>

              <Container maxWidth="lg">
                <FavContextProv>
                  {loading ? (
                    <Loader />
                  ) : (
                    <main>
                      <Routes>
                        <Route
                          path="/"
                          element={
                            <Home
                              openMessage={openMessage}
                              setOpenMessage={setOpenMessage}
                              mssg={mssg}
                              setMssg={setMssg}
                            />
                          }
                        />
                        <Route
                          path="/users"
                          element={
                            <RequireAuth>
                              {" "}
                              <UserFavs
                                openMessage={openMessage}
                                setOpenMessage={setOpenMessage}
                                mssg={mssg}
                                setMssg={setMssg}
                              />{" "}
                            </RequireAuth>
                          }
                        />
                        <Route
                          path="/users/profile"
                          element={
                            <RequireAuth>
                              <UserProfile
                                openMessage={openMessage}
                                setOpenMessage={setOpenMessage}
                                mssg={mssg}
                                setMssg={setMssg}
                              />
                            </RequireAuth>
                          }
                        />
                        <Route path="*" element={<NotFound />} />
                      </Routes>
                    </main>
                  )}
                </FavContextProv>
              </Container>
              <Footer />
            </AuthenticationProv>
          </Router>
        </div>
      </Paper>
    </ThemeProvider>
  );
}

export default App;
