import React, { useState, useEffect } from "react";
import Footer from "./homePage/footer";
import { useParams } from "react-router-dom";
import axios from "axios";
import { useLocation } from "react-router-dom";
import renderHTML from "react-render-html";
import Spinner from "./spinner";

export default function Post() {
  const location = useLocation();
  const [post, setPost] = useState(null);
  const { postId } = useParams();

  useEffect(() => {
    const postId = location.state.postId;

    const url = `/posts/${postId}`;

    axios.get(url).then((res) => {
      const {
        data: { data },
      } = res;
      setPost(data);
    });
  }, []);

  if (!post) return <Spinner />;

  return (
    <div id="wrapper">
      {/* Header */}
      {/* <header id="header">
        <div className="inner">
          <a className="logo">
            <span className="symbol">
              <img src="https://picsum.photos/200/300" alt />
            </span>
            <span className="title">By {post.author.username}</span>
          </a>
        </div>
      </header> */}

      {/* Menu */}
      {/* <nav id="menu">
        <h2>Menu</h2>
        <ul>
          <li>
            <a href="index.html">Home</a>
          </li>
          <li>
            <a href="generic.html">Ipsum veroeros</a>
          </li>
          <li>
            <a href="generic.html">Tempus etiam</a>
          </li>
          <li>
            <a href="generic.html">Consequat dolor</a>
          </li>
          <li>
            <a href="elements.html">Elements</a>
          </li>
        </ul>
      </nav> */}

      {/* Main */}
      <div id="main" style={{ marginTop: "5em" }}>
        <div className="inner">
          <h1>{post.title}</h1>
          <span className="image main">
            {/* <img
              src={`${axios.defaults.params.mediaURL}/img/posts/${post.coverImage}`}
              alt
            /> */}
          </span>
          {/* {post.content} */}
          {renderHTML(post.content)}
        </div>
      </div>
      {/* Footer */}
      <Footer />
    </div>
  );
}
