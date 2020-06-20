import React, { useState, useEffect } from "react";
import "./App.css";
import "./sass/main.scss";
import "./css/main.css";
import axios from "axios";
import AppRouter from "./router/router";
import AuthContext from "./authContext";
import Spinner from "./spinner";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetchDone, setIsFetchDone] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated, user, setUser };

  useEffect(() => {
    // get use details by sending auth token
    const url = "/users/isLoggedIn";
    axios
      .get(url, { withCredentials: true })
      .then((res) => {
        setUser(res.data.user);
        setIsAuthenticated(true);
        setIsFetchDone(true);
      })
      .catch((err) => {
        console.log(err);
        setIsFetchDone(true);
      });
  }, []);

  if (!isFetchDone) return <Spinner />;

  return (
    <div className="App">
      <AuthContext.Provider value={value}>
        <AppRouter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
