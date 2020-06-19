import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../authContext";

const AdminRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated, user } = useContext(AuthContext);

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated && user.role === "admin" ? (
          <Component {...props} />
        ) : (
          <Redirect to="/" />
        )
      }
    />
  );
};

export default AdminRoute;
