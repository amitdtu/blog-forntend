import React from "react";
import { createBrowserHistory } from "history";
import { BrowserRouter as Router, Switch, Route } from "react-router-dom";
import HomePage from "../homePage/homePage";
import Post from "../singlePost";
import MenuBar from "../navbar";
import PostsForAdmin from "../adminPanel/postsForAdmin";
import PostsForAuthors from "../adminPanel/postsForAuthors";
import TextEditor from "../textEditor";
import PrivateRoute from "./privateRoute";
import AdminRoute from "./adminRoute";
import UnauthenticatedRoute from "./unauthRoute";
import EditPost from "../editPost";
import ForgotPassword from "../forgotPassword";
import ResetPassword from "../resetPassword";
import ErrorPage from "../errorPage";

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

        <UnauthenticatedRoute
          path="/forgotPassword"
          exact={true}
          component={ForgotPassword}
        />
        <UnauthenticatedRoute
          path="/resetPassword/:resetToken"
          exact={true}
          component={ResetPassword}
        />

        <Route path="/post/:postId" exact={true} component={Post} />
        <PrivateRoute path="/posts" exact={true} component={PostsForAuthors} />
        <AdminRoute
          path="/posts-admin"
          exact={true}
          component={PostsForAdmin}
        />
        <PrivateRoute path="/createPost" exact={true} component={TextEditor} />
        <PrivateRoute
          path="/edit-post/:slug"
          exact={true}
          component={EditPost}
        />
        <Route path="*" component={ErrorPage} />
      </Switch>
    </Router>
  );
}
