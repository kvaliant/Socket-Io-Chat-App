import React from "react";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
const Header = () => {
  // const params = useParams();

  return (
    <div className="w-100 mb-2 bg-primary" style={{ height: "50px" }}>
      <div className="container">
        <h1 className="h2 text-light">Socket IO Chat App</h1>
      </div>
    </div>
  );
};

export default Header;
