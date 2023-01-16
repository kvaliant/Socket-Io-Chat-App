import React, { useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { regToken, selectUser } from "../redux/userSlice";
import { useSelector } from "react-redux";

const LoginPage = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const user = useSelector(selectUser);

  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const login = async (e) => {
    e.preventDefault();
    let url = "http://localhost:3001/login";
    let body = {
      username: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((res) => {
        let accessToken = res.data.accessToken;
        if (alert("Login successful")) {
        } else {
          let usr = {
            username: username,
            token: accessToken,
          };
          dispatch(regToken(usr));
          console.log(user);
          navigate(`/rooms`);
        }
      })
      .catch((err) => {
        if (alert(err.response.data.error)) {
        }
        console.log({ err });
      });
  };

  const register = async (e) => {
    e.preventDefault();
    let url = "http://localhost:3001/register";
    let body = {
      username: username,
      password: password,
    };
    axios
      .post(url, body)
      .then((res) => {
        if (alert("Registration sucessful, please login")) {
        }
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  return (
    <div className="container d-sm-flex">
      <div className="col-sm-4 m-2 p-2 border rounded-end">
        <Form onSubmit={login}>
          <h3>Login</h3>
          <Form.Group controlId="login-username">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="login-password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="m-2">
            Login
          </Button>
        </Form>
      </div>
      <div className="col-sm-8 m-2 p-2 border rounded-end">
        <Form onSubmit={register}>
          <h3>Register</h3>
          <Form.Group controlId="register-username">
            <Form.Label>Username</Form.Label>
            <Form.Control onChange={(e) => setUsername(e.target.value)} />
          </Form.Group>
          <Form.Group controlId="register-password">
            <Form.Label>Password</Form.Label>
            <Form.Control type="password" onChange={(e) => setPassword(e.target.value)} />
          </Form.Group>
          <Button variant="primary" type="submit" className="m-2">
            Register
          </Button>
        </Form>
      </div>
    </div>
  );
};

export default LoginPage;
