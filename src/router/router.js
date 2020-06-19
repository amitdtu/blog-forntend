import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../homePage/homePage";
import Post from "../generic";
import MenuBar from "../navbar";
import PostsForAdmin from "../adminPanel/postsForAdmin";
import PostsForAuthors from "../adminPanel/postsForAuthors";
import TextEditor from "../textEditor";

const history = createBrowserHistory();

export default function AppRouter() {
  return (
    <Router history={history}>
      <MenuBar />
      <Switch>
        <Route path="/" exact={true} component={HomePage} />

        <Route path="/technology" exact={true} component={HomePage} />
        <Route path="/health" exact={true} component={HomePage} />
        <Route path="/trending" exact={true} component={HomePage} />
        <Route path="/politics" exact={true} component={HomePage} />

        <Route path="/post/:postId" exact={true} component={Post} />
        <Route path="/posts" exact={true} component={PostsForAuthors} />
        <Route path="/posts-admin" exact={true} component={PostsForAdmin} />
        <Route path="/createPost" exact={true} component={TextEditor} />
      </Switch>
    </Router>
  );
}
