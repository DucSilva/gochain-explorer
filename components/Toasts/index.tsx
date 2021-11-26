import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { searchContract } from "@Redux/actions/home/index";

const Toasts = () => {
  const dispatch = useDispatch();
  const { show, message } = useSelector((state) => state.home) || {};

  return (
    <div className="container">
      <ToastContainer
        position="top-end"
        className="p-2 mr-3"
        style={{ zIndex: 10000 }}
      >
        <Toast
          show={show}
          onClose={() => dispatch(searchContract({ show: false, content: "" }))}
          delay={10000}
          autohide
          className="alert alert-warning"
        >
          <Toast.Header className="alert-warning">
            <strong className="me-auto" style={{ fontSize: 13 }}>
              {message && message.toUpperCase()}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Toasts;
