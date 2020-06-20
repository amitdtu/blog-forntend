import React, { useState } from "react";
import * as yup from "yup";
import { Formik } from "formik";
import { Container, Form, Button, Spinner } from "react-bootstrap";
import axios from "axios";
import AlertBlock from "./alertBlock";
import { useParams, useHistory } from "react-router-dom";

export default function ResetPassword() {
  const { resetToken } = useParams();
  const history = useHistory();

  const schema = yup.object({
    password: yup.string().required(),
    passwordConfirm: yup
      .string()
      .required()
      .oneOf([yup.ref("password"), null], "Passwords don't match"),
  });

  const [showAlert, setShowAlert] = useState(false);
  const [alertData, setAlertData] = useState(null);
  const [alertType, setAlertType] = useState(null);
  const [isLoading, setIsLoading] = useState(false);

  const formSubmitHandler = (values) => {
    setIsLoading(true);

    const url = `/users/resetPassword/${resetToken}`;

    axios
      .post(url, values)
      .then((res) => {
        setAlertData("Password reset successfully.");
        setShowAlert(true);
        setAlertType("success");
        setIsLoading(false);
        window.location = "/";
      })
      .catch((err) => {
        console.log(err.response);
        setAlertData(err?.response?.data?.message);
        setShowAlert(true);
        setAlertType("error");
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
              <Form.Label>Passoword</Form.Label>
              <Form.Control
                type="password"
                name="password"
                placeholder="Password"
                value={values.password}
                onChange={handleChange}
                isValid={touched.password && !errors.password}
                isInvalid={!!errors.password}
                feedback={errors.password}
              />
              <Form.Control.Feedback type="invalid">
                {errors.password}
              </Form.Control.Feedback>
            </Form.Group>
            <Form.Group controlId="validationFormik02">
              <Form.Label>Confirm Passoword</Form.Label>
              <Form.Control
                type="password"
                name="passwordConfirm"
                placeholder="Confirm Password"
                value={values.passwordConfirm}
                onChange={handleChange}
                isValid={touched.passwordConfirm && !errors.passwordConfirm}
                isInvalid={!!errors.passwordConfirm}
                feedback={errors.passwordConfirm}
              />
              <Form.Control.Feedback type="invalid">
                {errors.passwordConfirm}
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
      <AlertBlock
        setShow={setShowAlert}
        show={showAlert}
        data={alertData}
        type={alertType}
      />
    </Container>
  );
}
