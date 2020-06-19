import React, { useState, useContext, Fragment } from "react";
import { Navbar, Nav } from "react-bootstrap";
import LoginModal from "./loginAndSignUp/login";
import SignupModal from "./loginAndSignUp/signUp";
import { useHistory, Link } from "react-router-dom";
import AuthContext from "./authContext";

export default function Menubar() {
  const { user, isAuthenticated } = useContext(AuthContext);
  const history = useHistory();

  const [showLogin, setShowLogin] = useState(false);
  const [showSignup, setShowSignup] = useState(false);

  const handleShowLogin = () => setShowLogin(true);
  const handleCloseLogin = () => setShowLogin(false);

  const handleShowSignup = () => setShowSignup(true);
  const handleCloseSignup = () => setShowSignup(false);

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
