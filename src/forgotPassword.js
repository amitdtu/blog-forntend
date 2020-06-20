import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AlertBlock from "./alertBlock";

export default function ForgotPassword() {
  const schema = yup.object({
    email: yup.string().email().required(),
  });
  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (values) => {
    setIsLoading(true);
    const url = "/users/forgotPassword";
    axios.post(url, values).then((res) => {
      setAlertData("Reset Password Link has been sent to your email address.");
      setShowAlert(true);
      setIsLoading(false);
    });
  };
  return (
    <Container className="mt-4">
      <h4 className="text-center mb-4">Reset Password</h4>
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
          <Form
            noValidate
            onSubmit={handleSubmit}
            style={{ width: "40%" }}
            className="m-auto"
          >
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
            <Button variant="primary" type="submit">
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
      <AlertBlock setShow={setShowAlert} show={showAlert} data={alertData} />
    </Container>
  );
}
