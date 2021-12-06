import Link from "next/link";
import React from "react";

const Info = ({ text }: any) => {
  return (
    <div className="error">
      <div className="error__content">
        <span className="error_icon">
          <i className="fas fa-exclamation-circle"></i>
        </span>
        {text}
        <div className="error__toolbar">
          <Link href="/">
            <a>Go home</a>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Info;
