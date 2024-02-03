import React from "react";
import { Avatar, Button, Divider, Space, Typography } from "antd";
import styled from "styled-components";
import { useAuth } from "../../../context/UserAuthContext";

const { Title, Text } = Typography;

const Profile = () => {
  const { isAuthenticated, setIsAuthenticated, userData } = useAuth();

  return (
    <Container>
      <ProfileHeader>
        <Space>
          <Avatar size={100} src={userData.profileImg} />
          <Space direction="vertical" size="small">
            <Title level={4}>{userData.username}</Title>
            <Text>{userData.name}</Text>
            <Space direction="horizontal" size="small">
              <Title level={5}>{userData?.posts?.length} Posts</Title>
              <Title level={5}>{userData?.followers?.length} Followers</Title>
              <Title level={5}>{userData?.following?.length} Posts</Title>
            </Space>
          </Space>
        </Space>
        <Space>
          <Button type="primary">Edit Profile</Button>
        </Space>
      </ProfileHeader>

      <ProfileActions></ProfileActions>

      <Divider />
    </Container>
  );
};

const Container = styled.div`
  max-width: 600px;
  margin: 40px auto;
  padding: 20px;
  color: #fff;
  .ant-typography {
    color: #fff;
  }
  h4 {
    margin: 0;
  }
  h5 {
    margin: 0;
  }
  .ant-avatar-image {
    margin-right: 20px;
  }
`;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileActions = styled.div`
  text-align: center;
`;

export default Profile;
