import React from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";

export default function Signup(props) {
  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
    passwordConfirm: yup.string().required(),
  });

  return (
    <>
      <Modal show={props.showSignup} onHide={props.handleCloseSignup}>
        <Modal.Header closeButton>
          <Modal.Title>Signup</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Formik
            validationSchema={schema}
            onSubmit={(values) => console.log(values)}
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
