import { useDispatch, useSelector } from "react-redux";

import React from "react";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";
import { toastInformation } from "@Redux/actions/home";

const Toasts = () => {
  const dispatch = useDispatch();
  const { show, message, status } = useSelector((state: any) => state?.home) || {};

  return (
    <div className="container">
      <ToastContainer
        position="top-end"
        className="p-2 mr-3"
        style={{ zIndex: 10000 }}
      >
        <Toast
          show={show}
          onClose={() => dispatch(toastInformation({ show: false, content: "" }))}
          delay={5000}
          autohide
          className={`alert alert-${status}`}
        >
          <Toast.Header className={`alert-${status}`}>
            <strong className="me-auto" style={{ fontSize: 13 }}>
              {message && message?.toUpperCase()}
            </strong>
          </Toast.Header>
        </Toast>
      </ToastContainer>
    </div>
  );
};

export default Toasts;
