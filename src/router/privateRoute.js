import React, { useContext } from "react";
import { Route, Redirect } from "react-router-dom";
import AuthContext from "../authContext";

const PrivateRoute = ({ component: Component, ...rest }) => {
  const { isAuthenticated } = useContext(AuthContext);
  if (
    Component.name === "ForgotPassword" ||
    Component.name === "ResetPassword"
  ) {
    return (
      <Route
        {...rest}
        render={(props) =>
          !isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
        }
      />
    );
  }

  return (
    // Show the component only when the user is logged in
    // Otherwise, redirect the user to /signin page
    <Route
      {...rest}
      render={(props) =>
        isAuthenticated ? <Component {...props} /> : <Redirect to="/" />
      }
    />
  );
};

export default PrivateRoute;
