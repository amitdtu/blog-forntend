import React, { useState, useContext, Fragment } from "react";
import { Navbar, Nav, NavDropdown } from "react-bootstrap";
import LoginModal from "./loginAndSignUp/login";
import SignupModal from "./loginAndSignUp/signUp";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "./authContext";
import axios from "axios";

export default function Menubar() {
  const { user, isAuthenticated, setIsAuthenticated, setUser } = useContext(
    AuthContext
  );
  const history = useHistory();

  function capitalizeFirstLetter(string) {
    return string.charAt(0).toUpperCase() + string.slice(1);
  }

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

  const logoutUserHandler = () => {
    const url = "/users/logout";

    axios.get(url).then((res) => {
      setIsAuthenticated(false);
      setUser(null);
    });
  };

  return (
    <div>
      <LoginModal handleCloseLogin={handleCloseLogin} showLogin={showLogin} />
      <SignupModal
        handleCloseSignup={handleCloseSignup}
        showSignup={showSignup}
      />
      <Navbar bg="light" expand="lg">
        <Link to="/">
          <Navbar.Brand>R Blogs</Navbar.Brand>
        </Link>
        <Navbar.Toggle aria-controls="basic-navbar-nav" />
        <Navbar.Collapse id="basic-navbar-nav">
          <Nav className="mr-auto">
            <Nav.Link onClick={() => history.push("/technology")}>
              Tech
            </Nav.Link>
            <Nav.Link onClick={() => history.push("/health")}>Health</Nav.Link>
            <Nav.Link onClick={() => history.push("/trending")}>
              Trending
            </Nav.Link>
            <Nav.Link onClick={() => history.push("/politics")}>
              Politics
            </Nav.Link>
          </Nav>
          {isAuthenticated ? (
            <Fragment>
              {user?.role === "admin" ? (
                <Nav.Link onClick={() => history.push("/posts-admin")}>
                  All Blogs
                </Nav.Link>
              ) : (
                <Nav.Link onClick={() => history.push("/posts")}>
                  My Blogs
                </Nav.Link>
              )}

              <Nav.Link onClick={() => history.push("/createPost")}>
                Create Blog
              </Nav.Link>
              <Nav.Link>
                Hi{" "}
                {user
                  ? capitalizeFirstLetter(user.username.split(" ")[0])
                  : null}
              </Nav.Link>
              <Nav.Link onClick={logoutUserHandler}>Logout</Nav.Link>
              {/* <NavDropdown
                title={user?.username.split(" ")[0]}
                id="basic-nav-dropdown"
              >
                <NavDropdown.Item>Logout</NavDropdown.Item>
              </NavDropdown> */}
            </Fragment>
          ) : null}

          {!isAuthenticated ? (
            <Fragment>
              <Nav.Link onClick={handleShowSignup}>Sign Up</Nav.Link>
              <Nav.Link onClick={handleShowLogin}>Login</Nav.Link>
            </Fragment>
          ) : null}
        </Navbar.Collapse>
      </Navbar>
    </div>
  );
}
