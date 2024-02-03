// App.js
import { Fragment } from "react";
import PrivateRoutes from "./utils/PrivateRoutes";
import Login from "./pages/Login";
import Register from "./pages/Register";
import { Route, Routes } from "react-router";
import Dashboard from "./pages/Dashboard";
import Home from "./pages/Dashboard/Home";
import Notifications from "./pages/Dashboard/Notifications";
import Chats from "./pages/Dashboard/Chats";
import Profile from "./pages/Dashboard/Profile";
import styled from "styled-components";
import { Toaster } from "react-hot-toast";
import Explore from "./pages/Dashboard/Explore";
import Create from "./pages/Dashboard/Create";
import { Link } from "react-router-dom";

function App() {
  return (
    <StyledWrapper>
      <div className="App">
        <Routes>
          <Route element={<PrivateRoutes />}>
            <Route element={<Dashboard />} path="/" >
              <Route element={<Home />} path="/" />
              <Route element={<Notifications />} path="notifications" />
              <Route element={<Chats />} path="messages" />
              <Route element={<Profile />} path="profile/:id" />
              <Route element={<Explore />} path="explore" />
              <Route element={<Create />} path="create" />
            </Route>
          </Route>
          <Route element={<Login />} path="/login" />
          <Route element={<Register />} path="/register" />
          <Route element={<div><p>Not Found, <Link to={"/login"}>Go to Login</Link></p></div>} path="*" />
        </Routes>
      </div>
      <Toaster position="top-right" reverseOrder={false} />
    </StyledWrapper>
  );
}

const StyledWrapper = styled.div`
  width: 100%;
  background: #fafafa;
`;

export default App;
