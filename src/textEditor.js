import React, { useState, useEffect } from "react";
import SunEditor, { buttonList } from "suneditor-react";
import "suneditor/dist/css/suneditor.min.css";
import { Container, Form, Button } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import AlertBlock from "./alertBlock";

export default function TextEditor({ post }) {
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

  const handleChangeEditor = (content1) => {
    console.log(content1);
    setContent(content1);
  };

  const formSubmitHandler = (values) => {
    const valuesWithContent = { ...values, content: content };

    if (post) {
      const url = `/posts/my-posts/${post._id}`;
      axios.patch(url, valuesWithContent).then((res) => {
        console.log(res.data);
        setAlertBlockData(res.data.message);
        setShowAlert(true);
      });
    } else {
      const url = "/posts/my-posts";
      axios.post(url, valuesWithContent).then((res) => {
        console.log(res.data);
        setAlertBlockData(res.data.message);
        setShowAlert(true);
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

  return (
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
              Submit form
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
  );
}
