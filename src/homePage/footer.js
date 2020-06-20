import React, { useState } from "react";
import axios from "axios";

export default function Footer() {
  const [data, setData] = useState();
  const [showAlert, setShowAlert] = useState(false);

  const submitFormHandler = (e) => {
    const url = "/contactMe";
    let reg = /^([A-Za-z0-9_\-\.])+\@([A-Za-z0-9_\-\.])+\.([A-Za-z]{2,4})$/;

    if (data?.name || data?.email || data?.message) {
      if (reg.test(data?.email)) {
        e.preventDefault();
        axios.post(url, data).then((res) => {});
      }
    }
  };

  const inputChangeHandler = (e) => {
    setData({ ...data, [e.target.name]: e.target.value });
    setShowAlert(false);
  };

  return (
    <footer id="footer">
      <div className="inner">
        <section>
          <h2>Get in touch</h2>
          <form>
            <div className="fields">
              <div className="field half">
                <input
                  type="text"
                  name="name"
                  id="name"
                  required
                  onChange={inputChangeHandler}
                  placeholder="Name"
                />
              </div>
              <div className="field half">
                <input
                  type="email"
                  name="email"
                  id="email"
                  placeholder="Email"
                  required
                  onChange={inputChangeHandler}
                />
              </div>
              <div className="field">
                <textarea
                  name="message"
                  id="message"
                  placeholder="Message"
                  required
                  onChange={inputChangeHandler}
                />
              </div>
            </div>
            <ul className="actions">
              <li>
                <input
                  type="submit"
                  defaultValue="Send"
                  id="submit"
                  onClick={submitFormHandler}
                />
              </li>
            </ul>
          </form>
        </section>
        <section>
          <h2>Follow</h2>
          <ul className="icons">
            <li>
              <a
                onClick={() => window.open("http://github.com/amitdtu")}
                // href="/"
                style={{ cursor: "pointer" }}
                className="icon brands style2 fa-github"
              >
                <span className="label">GitHub</span>
              </a>
            </li>
            <li>
              <a
                // onClick={() =>
                //   window.open(
                //     "https://mail.google.com/mail/?view=cm&fs=1&to=amitdtu007@gmail.com"
                //   )
                // }
                // href="/"
                href="mailto:amitdtu007@gmail.com"
                className="icon solid style2 fa-envelope"
              >
                <span className="label">Email</span>
              </a>
            </li>
          </ul>
        </section>
        <ul className="copyright">
          <li>© Untitled. All rights reserved</li>
          <li>
            Design: <a href="#">HTML5 UP</a>
          </li>
        </ul>
      </div>
    </footer>
  );
}
