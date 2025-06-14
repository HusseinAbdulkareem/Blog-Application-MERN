import React from "react";
import { Link } from "react-router-dom";
import "./verify-email.css";

export default function VerifyEmail() {
  const isEmailVerified = true;
  return (
    <div className="verfiy-email">
      {isEmailVerified ? (
        <>
          <i className="bi bi-patch-check-fill verfiy-email-icon"></i>
          <h1 className="verfiy-email-title">
            Your email address has been successfully verified
          </h1>
          <Link to="/login" className="verfiy-email-link">
            <i className="bi bi-box-arrow-in-right"></i>
            Go To Login Page
          </Link>
        </>
      ) : (
        <>
          <i className="bi bi-exclamation-triangle-fill verfiy-email-icon"></i>
          <h1 className="verfiy-email-title">
            Your email address has not been verified yet
          </h1>
          <Link to="/login" className="verfiy-email-link">
            <i className="bi bi-arrow-repeat"></i>
            Try Again
          </Link>
        </>
      )}
    </div>
  );
}
