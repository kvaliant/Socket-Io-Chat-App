import React, { useEffect, useState } from "react";
import axios from "axios";
import socketIOClient from "socket.io-client";
import { useParams } from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import { Form, Button, Stack } from "react-bootstrap";

import { useSelector } from "react-redux";
import { selectUser } from "../redux/userSlice";

// const DUMMY_CHAT = [
//   { user: { username: "John Doe" }, content: "Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, Lorem ipsum dolor sit amet, ", date: "1111 - 11 - 11" },
//   { user: { username: "Jane Doe" }, content: "Hi", date: "1111 - 11 - 11" },
//   { user: { username: "Jane Doe" }, content: "John", date: "1111 - 11 - 11" },
//   { user: { username: "John Doe" }, content: "Hi!", date: "1111 - 11 - 11" },
// ];

const ChatPage = () => {
  const params = useParams();
  const user = useSelector(selectUser).user;

  const [chats, setChats] = useState([]);
  const [content, setContent] = useState("");
  const [socket, setSocket] = useState("");

  const loadRoom = async (e) => {
    let url = `http://localhost:3001/room/${params.uri}`;
    let headers = { authorization: `bearer ${user.token}` };
    axios
      .get(url, { headers: headers })
      .then((res) => {
        // console.log(res.data.room.chats);
        setChats(res.data.room.chats);
      })
      .catch((err) => {
        console.log({ err });
      });
  };

  const send = async (e) => {
    e.preventDefault();
    setContent("");

    let room = params.uri;
    let headers = { authorization: `bearer ${user.token}` };
    socket.emit("send_message", { headers: headers, content: content, room: room });
    let date = new Date();
    // console.log(user.username);
    let data = { content: content, room: room, user: { username: user.username }, date: date };
    console.log(data);
    setChats((old) => [...old, data]);
  };

  useEffect(() => {
    loadRoom();
    const s = socketIOClient("http://localhost:3002");
    setSocket(s);
    s.emit("join_room", params.uri);
    s.on("receive_message", (data) => {
      // console.log(data);
      setChats((old) => [...old, data]);
    });
  }, []); // eslint-disable-line react-hooks/exhaustive-deps

  return (
    <div className="container" style={{ height: "90vh" }}>
      <div className="container border overflow-auto py-2 d-flex flex-column-reverse" style={{ height: "80%" }}>
        <Stack gap={2} className="">
          {chats ? (
            chats.map((item, index) => (
              <div key={index} className={`container border rounded-end col-10 p-1 m-0 ${item.user.username === user.username ? "align-self-end text-end" : "align-self-start text-start"}`}>
                <div className="row">
                  <label className="lh-1" style={{ fontSize: "12px" }}>
                    {item.user.username}
                  </label>
                  <label className="text-break my-1 lh-1">{item.content}</label>
                  <label className="fw-light lh-1" style={{ fontSize: "8px" }}>
                    {new Date(item.date).toLocaleString("en-GB")}
                  </label>
                </div>
              </div>
            ))
          ) : (
            <div></div>
          )}
        </Stack>
      </div>
      <Form className="d-flex my-2" onSubmit={send}>
        <Form.Control placeholder="..." value={content} onChange={(e) => setContent(e.target.value)} />
        <Button variant="primary" type="submit" className="ms-2">
          Send
        </Button>
      </Form>
    </div>
  );
};

export default ChatPage;
