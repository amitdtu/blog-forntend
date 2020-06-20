import React, { useState, useEffect, Fragment } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Container, Form, Button, Alert, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import AlertBlock from "./alertBlock";

export default function TextEditor({ post }) {
  const [isLoading, setIsLoading] = useState(false);

  // if post data is avaliable
  const initialValues = () => {
    let obj = {};
    if (post) {
      obj.title = post.title;
      obj.tags = post.tags;
      obj.category = post.category;
      obj.description = post.description;
    }
    return obj;
  };

  // const [validated, setValidated] = useState(false);
  //   const [formData, setFormData] = useState({});
  const [content, setContent] = useState();
  const [showAlert, setShowAlert] = useState(false);
  const [alertBlockData, setAlertBlockData] = useState(null);
  const [coverImage, setCoverImage] = useState(null);
  const [imageURL, setImageURL] = useState(null);

  const handleChangeEditor = (content1) => {
    setContent(content1);
  };

  const formSubmitHandler = (values) => {
    setIsLoading(true);
    const valuesWithContent = { ...values, content: content };

    const formData = new FormData();

    formData.append("coverImage", coverImage);
    formData.append("title", values.title);
    formData.append("tags", values.tags);
    formData.append("category", values.category);
    formData.append("description", values.description);
    formData.append("content", content);

    if (post) {
      const url = `/posts/my-posts/${post._id}`;
      axios
        .patch(url, formData, {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        })
        .then((res) => {
          setAlertBlockData(res.data.message);
          setShowAlert(true);
          setIsLoading(false);
        });
    } else {
      const url = "/posts/my-posts";
      axios
        .post(url, formData, {
          headers: { "Content-Type": "multipart/form-data" },
        })
        .then((res) => {
          setAlertBlockData(res.data.message);
          setShowAlert(true);
          setIsLoading(false);
        });
    }
  };

  // useEffect(() => {
  //   const url = "/posts/my-posts";
  //   axios.post(url, )
  // }, []);

  const schema = yup.object({
    title: yup.string().required(),
    tags: yup.string().required(),
    category: yup.string().required(),
    description: yup.string().required().min(20).max(70),
  });

  const coverImageHandler = (e) => {
    setCoverImage(e.target.files[0]);
  };

  const blogImageHandler = (e) => {
    const url = "/posts/uploadImage";

    const formData = new FormData();
    formData.append("img", e.target.files[0]);

    axios
      .post(url, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      })
      .then((res) => {
        setImageURL(res.data.url);
      })
      .catch((err) => {
        console.log(err);
      });
  };

  return (
    <Fragment>
      <Container className="mt-4">
        <Alert variant="dark">
          <Alert.Heading>
            Want to add images in your posts? Follow these steps:-
          </Alert.Heading>
          <li className="list-group-item list-group-item-info">
            1. Upload image down below.
          </li>
          <li className="list-group-item list-group-item-info">
            2. After successful upload you will get an <strong>URL</strong>
          </li>
          <li className="list-group-item list-group-item-info">
            3. Paste that <strong>URL</strong> in your blog post.
          </li>
        </Alert>
        <Form.File id="formcheck-api-regular" className="mt-3">
          <Form.File.Label>Upload Image </Form.File.Label>
          <Form.File.Input onChange={blogImageHandler} />
        </Form.File>
        {imageURL ? (
          <Alert
            className="mt-2 d-flex justify-content-between"
            variant="success"
          >
            <div>URL: {imageURL}</div>
            <div>
              <Button variant="warning">Warning</Button>
            </div>
          </Alert>
        ) : null}
      </Container>
      <Container className="write-post-conatiner">
        <h1 style={{ textAlign: "center" }}>Write Your Blog</h1>

        <Formik
          validationSchema={schema}
          onSubmit={(values) => formSubmitHandler(values)}
          initialValues={initialValues()}
        >
          {({
            handleSubmit,
            handleChange,
            handleBlur,
            values,
            touched,
            isValid,
            errors,
          }) => (
            <Form noValidate onSubmit={handleSubmit}>
              <Form.Group controlId="validationFormik01">
                <Form.Label>Title</Form.Label>
                <Form.Control
                  type="text"
                  name="title"
                  placeholder="Title"
                  value={values.title}
                  onChange={handleChange}
                  isValid={touched.title && !errors.title}
                  isInvalid={!!errors.title}
                  feedback={errors.title}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.title}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.File id="formcheck-api-regular">
                <Form.File.Label>Upload Cover Image </Form.File.Label>
                <Form.File.Input onChange={coverImageHandler} />
              </Form.File>
              <Form.Group controlId="validationFormik02">
                <Form.Label>Tags</Form.Label>
                <Form.Control
                  type="text"
                  name="tags"
                  placeholder="corona, economy, china"
                  value={values.tags}
                  onChange={handleChange}
                  isValid={touched.tags && !errors.tags}
                  isInvalid={!!errors.tags}
                  feedback={errors.tags}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.tags}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik03">
                <Form.Label>Description</Form.Label>
                <Form.Control
                  type="text"
                  name="description"
                  placeholder="write your description less than 150 characters"
                  value={values.description}
                  onChange={handleChange}
                  isValid={touched.description && !errors.description}
                  isInvalid={!!errors.description}
                  feedback={errors.description}
                />
                <Form.Control.Feedback type="invalid">
                  {errors.description}
                </Form.Control.Feedback>
              </Form.Group>
              <Form.Group controlId="validationFormik04">
                <Form.Label>Category</Form.Label>
                <Form.Control
                  type="select"
                  name="category"
                  placeholder="corona, economy, china"
                  value={values.category}
                  onChange={handleChange}
                  isValid={touched.category && !errors.category}
                  isInvalid={!!errors.category}
                  feedback={errors.category}
                  as="select"
                  custom
                >
                  <option>select category</option>
                  <option>health</option>
                  <option>politics</option>
                  <option>technology</option>
                  <option>trending</option>
                  <Form.Control.Feedback type="invalid">
                    {errors.category}
                  </Form.Control.Feedback>
                </Form.Control>
              </Form.Group>
              <label>Content</label>
              <SunEditor
                setContents={post ? post.content : ""}
                onChange={handleChangeEditor}
                setDefaultStyle="font-family: cursive; font-size: 13px;"
                setOptions={{
                  height: 200,
                  buttonList: [
                    ["undo", "redo"],
                    ["font", "fontSize", "formatBlock"],
                    ["paragraphStyle", "blockquote"],
                    [
                      "bold",
                      "underline",
                      "italic",
                      "strike",
                      "subscript",
                      "superscript",
                    ],
                    ["fontColor", "hiliteColor", "textStyle"],
                    ["removeFormat"],
                    ["outdent", "indent"],
                    ["align", "horizontalRule", "list", "lineHeight"],
                    ["table", "link", "image"],
                    ["fullScreen", "showBlocks", "codeView"],
                    ["preview", "print"],
                    ["save", "template"],
                  ],
                }}
              />
              <Button variant="info" type="submit">
                {isLoading ? (
                  <Spinner
                    as="span"
                    animation="border"
                    size="sm"
                    role="status"
                    aria-hidden="false"
                    className="mr-2"
                  />
                ) : null}
                Submit
              </Button>
            </Form>
          )}
        </Formik>
        <AlertBlock
          show={showAlert}
          setShow={setShowAlert}
          data={alertBlockData}
        />
      </Container>
    </Fragment>
  );
}
