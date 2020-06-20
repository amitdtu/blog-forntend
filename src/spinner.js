import React from "react";
import { Spinner } from "react-bootstrap";

export default function LoadingSpinner() {
  return (
    <div className="text-center mt-4" style={{ width: "100%", height: "50vh" }}>
      <Spinner animation="border" variant="primary" />
    </div>
  );
}
