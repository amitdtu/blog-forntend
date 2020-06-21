import React from "react";
import { useHistory } from "react-router-dom";

export default function ErrorPage() {
  const history = useHistory();
  return (
    <div className="container text-center my-5">
      <h1 className="text-primary">
        <img src="https://img.icons8.com/cute-clipart/100/000000/bug.png" /> 404
      </h1>
      <h1 className="text-primary">Page not found</h1>
      <h5>
        We are sorry, the page you requested could not be found.Please go back
        to the homepage.
      </h5>
      <a
        className={"btn btn-primary btn-lg text-white mt-4 homeButton"}
        onClick={() => history.push("/")}
      >
        Take Me Home
      </a>
    </div>
  );
}
