import React from "react";
import { Toast } from "react-bootstrap";

export default function AlertBlock({ setShow, show, data, type }) {
  return (
    <Toast
      className="text-center"
      style={{ display: "block", margin: "auto" }}
      onClose={() => setShow(false)}
      show={show}
      delay={2000}
      autohide
    >
      <Toast.Body
        style={{
          color: type === "error" ? "#721c24" : "#155724",
          backgroundColor: type === "error" ? "#f8d7da" : "#d4edda",
          borderColor: type === "error" ? "f5c6cb" : "#c3e6cb",
        }}
      >
        {data}
      </Toast.Body>
    </Toast>
  );
}
