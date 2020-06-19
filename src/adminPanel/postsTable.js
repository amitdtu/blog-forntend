import React, { useState, useEffect, Fragment, useContext } from "react";
import { Nav, Container, Table, Button, Toast, Alert } from "react-bootstrap";
import { useHistory } from "react-router-dom";
import AuthContext from "../authContext";
import axios from "axios";

export default function BlogsTable({ posts, isRefresh }) {
  const { user } = useContext(AuthContext);

  const history = useHistory();
  //   console.log(location);
  console.log(posts);

  const [displayPosts, setDisplayPosts] = useState(null);
  const [actionButton, setActionButton] = useState("pendingPosts");
  const [toastData, setToastData] = useState("test data");
  const [show, setShow] = useState(false);

  console.log(displayPosts);

  useEffect(() => {
    setDisplayPosts(posts[actionButton]);
  }, []);

  const publishPostHandler = (postId) => {
    const url = "/posts/approve/" + postId;
    axios.post(url).then((res) => {
      console.log(res.data);
      setShow(true);
      setToastData(res.data.message);
      setDisplayPosts(displayPosts.filter((el) => el._id !== postId));
      isRefresh();
    });
  };

  const rejectPostHandler = (postId) => {
    const url = "/posts/reject/" + postId;
    axios.post(url).then((res) => {
      console.log(res.data);
      setShow(true);
      setToastData(res.data.message);
      setDisplayPosts(displayPosts.filter((el) => el._id !== postId));
      isRefresh();
    });
  };
  const deletePostHandler = (postId) => {
    const url = "/posts/my-posts/" + postId;
    axios.delete(url).then((res) => {
      console.log(res.data);
      setShow(true);
      setToastData(res.data.message);
      setDisplayPosts(displayPosts.filter((el) => el._id !== postId));
      isRefresh();
    });
  };

  const changeDisplayPosts = (typeOfPosts) => {
    setDisplayPosts(posts[typeOfPosts]);
    setActionButton(typeOfPosts);
    console.log("another type of post ", typeOfPosts);
    console.log(actionButton);
  };

  if (!displayPosts) return <div>Loading...</div>;

  return (
    <Container className="mt-4">
      <Toast
        className="text-center"
        style={{ display: "block", margin: "auto" }}
        onClose={() => setShow(false)}
        show={show}
        delay={1500}
        autohide
      >
        <Toast.Body
          style={{
            color: "#155724",
            backgroundColor: "#d4edda",
            borderColor: "#c3e6cb",
          }}
        >
          {toastData}
        </Toast.Body>
      </Toast>
      <Nav variant="tabs" defaultActiveKey="link-1">
        <Nav.Item>
          <Nav.Link
            onClick={() => changeDisplayPosts("pendingPosts")}
            eventKey="link-1"
          >
            Pending
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => changeDisplayPosts("approvedPosts")}
            eventKey="link-2"
          >
            Accepted
          </Nav.Link>
        </Nav.Item>
        <Nav.Item>
          <Nav.Link
            onClick={() => changeDisplayPosts("rejectedPosts")}
            eventKey="link-3"
          >
            Rejected
          </Nav.Link>
        </Nav.Item>
      </Nav>
      <Table striped bordered hover size="sm">
        <thead>
          <tr>
            <th>#</th>
            <th style={{ minWidth: "33vw" }}>Title</th>
            <th style={{ minWidth: "20vw" }}>Author Name</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {displayPosts.length
            ? displayPosts.map((post, i) => (
                <tr>
                  <td>{i + 1}</td>
                  <td
                    className="text-primary"
                    style={{ cursor: "pointer" }}
                    onClick={() =>
                      history.push({
                        pathname: `/post/${post.slug}`,
                        state: { postId: post._id },
                      })
                    }
                  >
                    {post.title}
                  </td>
                  <td>{post.author.username}</td>
                  <td>
                    {user?.role === "admin" ? (
                      <Fragment>
                        {actionButton === "pendingPosts" ||
                        actionButton === "rejectedPosts" ? (
                          <Button
                            onClick={() => publishPostHandler(post._id)}
                            variant="primary"
                            className="mr-4"
                            size="sm"
                          >
                            Publish
                          </Button>
                        ) : null}
                        {actionButton === "pendingPosts" ||
                        actionButton === "approvedPosts" ? (
                          <Button
                            onClick={() => rejectPostHandler(post._id)}
                            variant="danger"
                            size="sm"
                          >
                            Reject
                          </Button>
                        ) : null}
                      </Fragment>
                    ) : (
                      <Button
                        onClick={() => deletePostHandler(post._id)}
                        variant="danger"
                        size="sm"
                      >
                        Delete
                      </Button>
                    )}
                  </td>
                </tr>
              ))
            : null}
        </tbody>
      </Table>
      {displayPosts.length === 0 ? (
        <div className="mt-4 text-center">No Post</div>
      ) : null}
    </Container>
  );
}
