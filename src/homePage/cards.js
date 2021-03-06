import React, { useState, useEffect } from "react";
import { useHistory } from "react-router-dom";
import axios from "axios";
import randomcolor from "randomcolor";
import Spinner from "../spinner";

export default function Cards({ category }) {
  const history = useHistory();

  const [posts, setPosts] = useState(null);
  const [postsByCategory, setPostsByCategory] = useState(null);

  useEffect(() => {
    const url = "/posts/simple";
    if (!posts) {
      axios.get(url).then((res) => {
        const {
          data: { data },
        } = res;
        if (category) {
          const filteredPosts = data.filter((el) => el.category === category);
          setPostsByCategory(filteredPosts);
        }
        setPosts(data);
      });
    } else {
      const filteredPosts = posts.filter((el) => el.category === category);
      setPostsByCategory(filteredPosts);
    }
  }, [category]);

  // useEffect(() => {
  //   const filteredPosts = posts.filter((el) => el.category === category);
  //   setPostsByCategory(filteredPosts);
  // }, [category]);

  const cards = (postsArray) => {
    return postsArray?.map((post, index) => (
      <article
        style={{ cursor: "pointer" }}
        key={index}
        onClick={() =>
          history.push({
            pathname: `/post/${post.slug}`,
            state: { postId: post._id },
          })
        }
        className={"style" + index + 1}
      >
        <span className="image">
          {post.coverImage !== "null" ? (
            <img
              src={`${axios.defaults.params.mediaURL}/img/posts/${post.coverImage}`}
              alt=""
            />
          ) : (
            <img src={"https://picsum.photos/500/500"} alt="" />
          )}
        </span>
        <a>
          <h2>{post.title}</h2>
          <div className="content">
            <p>{post.description}</p>
          </div>
        </a>
      </article>
    ));
  };

  let tiles;
  if (!category) {
    tiles = cards(posts);
  } else {
    tiles = cards(postsByCategory);
  }

  if (!tiles) return <Spinner />;

  return (
    <div id="main">
      <div className="inner">
        {/* <header>
          <h1>
            This is Phantom, a free, fully responsive site
            <br />
            template designed by <a href="http://html5up.net">HTML5 UP</a>.
          </h1>
          <p>
            Etiam quis viverra lorem, in semper lorem. Sed nisl arcu euismod sit
            amet nisi euismod sed cursus arcu elementum ipsum arcu vivamus quis
            venenatis orci lorem ipsum et magna feugiat veroeros aliquam. Lorem
            ipsum dolor sit amet nullam dolore.
          </p>
        </header> */}
        <section className="tiles">
          {tiles.length ? (
            tiles
          ) : (
            <div className="mt-4 text-center w-100">
              <h4>No Post</h4>
            </div>
          )}
        </section>
      </div>
    </div>
  );
}
