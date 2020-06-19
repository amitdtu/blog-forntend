import React, { useState, useEffect } from "react";
import "./App.css";
import "./sass/main.scss";
import "./css/main.css";

import AppRouter from "./router/router";
import AuthContext from "./authContext";

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isFetchDone, setisFetchDone] = useState(false);
  const value = { isAuthenticated, setIsAuthenticated, user, setUser };

  useEffect(() => {
    // get use details by sending auth token
  }, []);

  // if (!isFetchDone) return <div>Loading...</div>;

  return (
    <div className="App">
      <AuthContext.Provider value={value}>
        <AppRouter />
      </AuthContext.Provider>
    </div>
  );
}

export default App;
