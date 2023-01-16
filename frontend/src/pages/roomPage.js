import React, { useEffect, useState } from "react";
import axios from "axios";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Stack } from "react-bootstrap";
import { useNavigate } from "react-router-dom";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

// const DUMMY_ROOM = [{ name: "Casual" }, { name: "Comedy" }, { name: "Politics" }];

const RoomPage = () => {
  const navigate = useNavigate();
  const user = useSelector(selectUser).user;

  const [name, setName] = useState("");
  const [rooms, setRooms] = useState("");

  const create = async (e) => {
    let url = "http://localhost:3001/rooms";
    let headers = { authorization: `bearer ${user.token}` };
    let body = {
      name: name,
    };
    axios
      .post(url, body, { headers: headers })
      .then((res) => {})
      .catch((err) => {
        console.log({ err });
      });
  };

  useEffect(() => {
    async function loadAll() {
      let url = "http://localhost:3001/rooms";
      let headers = { authorization: `bearer ${user.token}` };
      axios
        .get(url, { headers: headers })
        .then((res) => {
          // console.log(res);
          setRooms(res.data.rooms);
        })
        .catch((err) => {
          console.log(err);
        });
    }
    loadAll();
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container">
      <Form onSubmit={create} className="d-sm-flex p-2 col-sm-8">
        <Form.Group className="d-flex" controlId="name">
          <Form.Label className="me-2 mt-1">Create</Form.Label>
          <Form.Control size="sm" placeholder="Name" onChange={(e) => setName(e.target.value)} />
        </Form.Group>
        <Button variant="primary" type="submit" className="ms-sm-2 mt-2 mt-sm-0">
          Create
        </Button>
      </Form>
      <div className="container border rounded-end py-2">
        <Stack gap={2}>
          {rooms ? (
            rooms.map((item) => (
              <div key={item.uri} className="container border rounded-end d-flex justify-content-between pb-2">
                <div className="w-75">
                  <h5>Room Name:</h5>
                  <label>{item.name}</label>
                </div>
                <div className="w-25">
                  <div className="flex-row">
                    <strong>{"Owner : "}</strong>
                    <label>{item.owner.username}</label>
                  </div>
                  <Button variant="secondary" className="m-0" onClick={() => navigate(`/chat/${item.uri}`)}>
                    Join
                  </Button>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Stack>
      </div>
    </div>
  );
};

export default RoomPage;
