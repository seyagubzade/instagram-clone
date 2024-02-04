import { Button, Layout, Menu } from "antd";
import { Link, Outlet, useLocation } from "react-router-dom";
import styled from "styled-components";
import Icon from "../../assets/icons";
import { useAuth } from "../../context/UserAuthContext";
import { useEffect, useState } from "react";
import { useMediaQuery } from "react-responsive";

const { Sider, Content } = Layout;

const Dashboard = () => {
  const { isAuthenticated, setIsAuthenticated, userData } = useAuth();
  const [isCollapsed, setIsCollapsed] = useState(false);
  const location = useLocation();

  const isTabletOrMobile = useMediaQuery({ query: "(max-width: 720px)" });

  const sideBarData = [
    {
      key: "home",
      name: "Home",
      path: "/home",
      icon: "home",
    },
    {
      key: "explore",
      name: "Explore",
      path: "/explore",
      icon: "search",
    },
    {
      key: "messages",
      name: "Messages",
      path: "/messages",
      icon: "message",
    },
    {
      key: "notifications",
      name: "Notifications",
      path: "/notifications",
      icon: "notification",
    },
    {
      key: "create",
      name: "Create",
      path: "/create",
      icon: "plus",
    },
    {
      key: "profile",
      name: "Profile",
      path: `/profile/${userData?._id}`,
      icon: "user",
    },
  ];

  const defaultSelectedKey =
    sideBarData.find((data) => location.pathname.includes(data.key))?.key ||
    "/";

  useEffect(() => {
    if(isTabletOrMobile){
      setIsCollapsed(true);
    }else{
      setIsCollapsed(false)
    }
  }, [isTabletOrMobile]);
  return (
    <StyledWrapper>
      <Layout style={{ minHeight: "100vh" }}>
        <Sider
          trigger={null}
          collapsible
          width={isCollapsed ? 100 : 220}
          style={{
            background: "#000",
            color: "#fff",
            position: "fixed",
            left: 0,
            top: 0,
            height: "100vh",
            borderRight: "1px solid rgba(255,255,255,0.2)",
            padding: "0 12px",
          }}
        >
          <div className="logo">
            {/* <img
              src="https://www.pngkey.com/png/full/28-287308_instagram-logo-text-white.png"
              alt=""
            /> */}
            {isCollapsed ? <Icon name={"igIcon"} /> : <Icon name={"igText"} />}
          </div>
          <Menu
            mode="inline"
            defaultSelectedKeys={[defaultSelectedKey]}
            style={{
              height: "100%",
              width: "100%",
              borderRight: 0,
              background: "#000",
              color: "#fff",
            }}
          >
            {sideBarData.map((data, index) => (
              <Menu.Item
                key={data.key}
                style={{
                  width: "100%",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  paddingLeft: isCollapsed ? "14px" : "24px",
                }}
              >
                <Link
                  to={data.path}
                  style={{ justifyContent: isCollapsed ? "center" : "" }}
                >
                  <Icon
                    name={data.icon}
                    style={{ paddingLeft: isCollapsed ? "2px" : "" }}
                  />
                  {!isCollapsed ? data.name : ""}
                </Link>
              </Menu.Item>
            ))}
            <Button
              style={{
                background: "#000",
                padding: "12px",
                display: "flex",
                alignItems: "center",
                position: "absolute",
                bottom: "20px",
              }}
              onClick={() => setIsCollapsed(!isCollapsed)}
            >
              <Icon name={"hamburger"} />
            </Button>
          </Menu>
        </Sider>
        <Layout
          style={{
            marginLeft: isCollapsed ? 100 : 220,
            background: "#000",
            color: "#fff",
          }}
        >
          <Content style={{ padding: "0 24px 24px" }}>
            <Outlet />
          </Content>
        </Layout>
      </Layout>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  background: #000;
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
      width: 60%;
    }
  }
  .ant-menu-title-content {
    a {
      display: flex;
      align-items: center;
      gap: 8px;
    }
  }
  .ant-menu-light .ant-menu-item-selected {
    background-color: rgba(255, 255, 255, 0.25);
    color: #fff;
  }
  .ant-layout-sider-children {
    ul {
      display: flex;
      justify-content: flex-start;
      flex-direction: column;
      align-items: center;
    }
  }
`;
export default Dashboard;
