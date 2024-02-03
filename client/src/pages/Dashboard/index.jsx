// Dashboard.js
import { Layout, Menu } from "antd";
import { Link, Outlet, Route, Routes } from "react-router-dom";
import Notifications from "./Notifications";
import Chats from "./Chats";
import Home from "./Home";
import Profile from "./Profile";
import styled from "styled-components";
import Icon from "../../assets/icons";
import { useAuth } from "../../context/UserAuthContext";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated, userData } = useAuth();

  const sideBarData = [
    {
      name: "Home",
      path: "/",
      icon: "home",
    },
    {
      name: "Explore",
      path: "/explore",
      icon: "search",
    },
    {
      name: "Messages",
      path: "/messages",
      icon: "message",
    },
    {
      name: "Notifications",
      path: "/notifications",
      icon: "notification",
    },
    {
      name: "Create",
      path: "/create",
      icon: "plus",
    },
    {
      name: "Profile",
      path: `/profile/${userData?._id}`,
      icon: "avatar",
    },
  ];

  return (
    <StyledWrapper>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
         trigger={null} collapsible
          width={200}
          style={{
            background: "#000",
            color: "#fff",
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            borderRight: "1px solid rgba(255,255,255,0.2)",
          }}
        >
          <div className="logo">
            <img
              src="https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
              alt=""
            />
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={["1"]}
            style={{
              height: "100%",
              borderRight: 0,
              background: "#000",
              color: "#fff",
            }}
          >
            {sideBarData.map((data, index) => (
              <Menu.Item key={index}>
                <Link to={data.path}>
                  <Icon name={data.icon} />
                  {data.name}
                </Link>
              </Menu.Item>
            ))}
          </Menu>
        </Sider>
        <Layout style={{ marginLeft: 200, background: "#000", color: "#fff" }}>
          <Content style={{ padding: "0 24px 24px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  .ant-menu-light:not(.ant-menu-horizontal)
    .ant-menu-item:not(.ant-menu-item-selected):hover {
    background-color: rgba(255, 255, 255, 0.25);
    color: #fff;
  }
  .logo {
    padding: 20px 0;
    display: flex;
    align-items: center;
    justify-content: center;
    img {
      width: 70%;
    }
  }
  .ant-menu-title-content {
    a {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
  .ant-menu-light .ant-menu-item-selected{
    background-color: rgba(255, 255, 255, 0.25);
    color: #fff;
  }
`;
export default Dashboard;
