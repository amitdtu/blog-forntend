import React, { useState, useEffect } from "react";
import PostsTable from "./postsTable";
import axios from "axios";

export default function PostsForAdmin() {
  const [posts, setPosts] = useState(null);
  const [randomNumber, setRandomNumber] = useState(null);

  const isRefresh = () => setRandomNumber(Math.random());

  useEffect(() => {
    const url = "/posts/my-posts";
    axios.get(url).then((res) => {
      console.log(res.data);
      const {
        data: { data },
      } = res;
      const pendingPosts = data.filter((el) => el.publish === 100);
      const approvedPosts = data.filter((el) => el.publish === 101);
      const rejectedPosts = data.filter((el) => el.publish === 102);
      setPosts({ pendingPosts, approvedPosts, rejectedPosts });
    });
  }, [randomNumber]);

  if (!posts) return <div>Loading...</div>;

  return (
    <div>
      <h1 className="display-4 text-center">All Posts</h1>
      <PostsTable posts={posts} isRefresh={isRefresh} />
    </div>
  );
}
