import "./App.css";
import { Route, Routes } from "react-router-dom";
import "bootstrap/dist/css/bootstrap.min.css";

import Header from "./layouts/header";

import LoginPage from "./pages/loginPage";
import RoomPage from "./pages/roomPage";
import ChatPage from "./pages/chatPage";

import NotFoundPage from "./pages/notFoundPage";

import React from "react";

import { connect } from "react-redux";

const mapStateToProps = (state) => ({
  user: state.user,
});

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      user: {},
    };
  }
  componentDidMount() {
    this.setState({ user: this.props.user });
  }
  componentDidUpdate() {
    if (this.props.user !== this.state.user) {
      this.setState({ user: this.props.user });
    }
  }

  render() {
    return (
      <div className="App">
        <Header />
        <div className="container">
          <Routes>
            {this.state.user.token === ""
              ? [
                  <Route key={"routeLogin"} path="/login" element={<LoginPage />} />,
                  <Route key={"routeChat"} path="/chat/:uri" element={<LoginPage />} />,
                  <Route key={"routeRooms"} path="/rooms" element={<LoginPage />} />,
                  <Route key={"routeHome"} path="/" element={<LoginPage />} />,
                  <Route key={"routeNotFound"} path="*" element={<NotFoundPage />} />,
                ]
              : [
                  <Route key={"routeChat"} path="/chat/:uri" element={<ChatPage />} />,
                  <Route key={"routeRooms"} path="/rooms" element={<RoomPage />} />,
                  <Route key={"routeHome"} path="/" element={<RoomPage />} />,
                  <Route key={"routeNotFound"} path="*" element={<NotFoundPage />} />,
                ]}
          </Routes>
        </div>
        {/* <div style={{ height: "100vh" }}>
          <label></label>
        </div> */}
      </div>
    );
  }
}

export default connect(mapStateToProps, null)(App);
