import React, { useState, useContext } from "react";
import { Modal, Button, Form, Spinner } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import AuthContext from "../authContext";
import axios from "axios";

export default function Signup(props) {
  const schema = yup.object({
    email: yup.string().email().required(),
    username: yup.string().required(),
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  });

  const [isLoading, setIsLoading] = useState(false);
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const formSubmitHandler = (values) => {
    setIsLoading(true);
    const url = "users/signup";
    axios
      .post(url, values)
      .then((res) => {
        const {
          data: { data },
        } = res;
        setIsAuthenticated(true);
        setUser(data.user);
        setIsLoading(false);
        props.handleCloseLogin();
      })
      .catch((err) => {
        console.log(err?.response?.data);
        setIsLoading(false);
      });
  };

  return (
    <>
      <Modal show={props.showSignup} onHide={props.handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => formSubmitHandler(values)}
            initialValues={{}}
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
                  <Form.Label>Email</Form.Label>
                  <Form.Control
                    type="text"
                    name="email"
                    placeholder="Email"
                    value={values.email}
                    onChange={handleChange}
                    isValid={touched.email && !errors.email}
                    isInvalid={!!errors.email}
                    feedback={errors.email}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.email}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik01">
                  <Form.Label>Username</Form.Label>
                  <Form.Control
                    type="text"
                    name="username"
                    placeholder="Username"
                    value={values.username}
                    onChange={handleChange}
                    isValid={touched.username && !errors.username}
                    isInvalid={!!errors.username}
                    feedback={errors.username}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.username}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik02">
                  <Form.Label>Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="password"
                    placeholder="Password"
                    value={values.tags}
                    onChange={handleChange}
                    isValid={touched.password && !errors.password}
                    isInvalid={!!errors.password}
                    feedback={errors.password}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.password}
                  </Form.Control.Feedback>
                </Form.Group>
                <Form.Group controlId="validationFormik03">
                  <Form.Label>Confirm Password</Form.Label>
                  <Form.Control
                    type="password"
                    name="passwordConfirm"
                    placeholder="Confirm Password"
                    value={values.tags}
                    onChange={handleChange}
                    isValid={touched.passwordConfirm && !errors.passwordConfirm}
                    isInvalid={!!errors.passwordConfirm}
                    feedback={errors.passwordConfirm}
                  />
                  <Form.Control.Feedback type="invalid">
                    {errors.passwordConfirm}
                  </Form.Control.Feedback>
                </Form.Group>
                <Button onClick={props.handleCloseSignup} type="submit">
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
                  Signup
                </Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
      </Modal>
    </>
  );
}
