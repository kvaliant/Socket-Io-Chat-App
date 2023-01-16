import React from "react";

import "bootstrap/dist/css/bootstrap.min.css";
import { Link } from "react-router-dom";

const NotFoundPage = () => {
  return (
    <div className="container mt-5">
      <h1 style={{ fontSize: "128px" }}>404</h1>
      <h1>Page Not Found</h1>
      <div className="d-flex flex-column mt-5">
        <strong>Available Endpoints</strong>
        <Link to={"/login"}>/login</Link>
        <Link to={"/room"}>/room</Link>
        <Link to={"/chat"}>/chat</Link>
      </div>
    </div>
  );
};

export default NotFoundPage;
