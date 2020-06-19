import React from "react";
import { Toast } from "react-bootstrap";

export default function AlertBlock({ setShow, show, data }) {
  return (
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
        {data}
      </Toast.Body>
    </Toast>
  );
}
