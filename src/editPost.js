import React, { useState, useEffect } from "react";
import axios from "axios";
import { useLocation } from "react-router-dom";
import TextEditor from "./textEditor"

export default function EditPost() {
  const location = useLocation();

  const [post, setPost] = useState(null);

  useEffect(() => {
    const url = `/posts/my-posts/${location.state.postId}`;

    axios.get(url).then((res) => {
      const {
        data: { data },
      } = res;
      setPost(data)
      console.log(res.data);
    });
  }, []);


  if(!post) return <div>Loading...</div>;

  return <TextEditor post={post} />;
}
