import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TextEditor from "./textEditor";
import Spinner from "./spinner";

export default function EditPost() {
  const location = useLocation();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const url = `/posts/my-posts/${location.state.postId}`;

    axios.get(url).then((res) => {
      const {
        data: { data },
      } = res;
      setPost(data);
    });
  }, []);

  if (!post) return <Spinner />;

  return <TextEditor post={post} />;
}
