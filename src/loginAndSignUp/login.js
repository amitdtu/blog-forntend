import React, { useContext } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import * as yup from "yup";
import { Formik } from "formik";
import axios from "axios";
import AuthContext from "../authContext";

export default function Login(props) {
  const { setIsAuthenticated, setUser } = useContext(AuthContext);

  const schema = yup.object({
    email: yup.string().email().required(),
    password: yup.string().required(),
  });

  const formSubmitHandler = (values) => {
    const url = "users/login";
    console.log(values);
    axios
      .post(url, values)
      .then((res) => {
        const {
          data: { data },
        } = res;
        console.log(res);
        setIsAuthenticated(true);
        setUser(data.user);
        props.handleCloseLogin();
        // axios.defaults.headers.common["Authorization"] = "AUTH_TOKEN";
      })
      .catch((err) => console.log(err?.response?.data));
  };

  return (
    <>
      <Modal show={props.showLogin} onHide={props.handleCloseLogin}>
        <Modal.Header closeButton>
          <Modal.Title>Login</Modal.Title>
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
                <Button type="submit">Login</Button>
              </Form>
            )}
          </Formik>
        </Modal.Body>
        {/* <Modal.Footer>
          <Button variant="secondary" onClick={props.handleCloseLogin}>
            Close
          </Button>
          <Button variant="primary" onClick={props.handleCloseLogin}>
            Save Changes
          </Button>
        </Modal.Footer> */}
      </Modal>
    </>
  );
}
