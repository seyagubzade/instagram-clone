import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Divider,
  Empty,
  Skeleton,
  Space,
  Typography,
} from "antd";
import styled from "styled-components";
import { useAuth } from "../../../context/UserAuthContext";
import { useDispatch, useSelector } from "react-redux";
import { getUserById } from "../../../store/users/api_request";
import { useParams } from "react-router";

const { Title, Text } = Typography;

const Profile = () => {
  const [isUserAdmin, setIsUserAdmin] = useState(false);
  const { isAuthenticated, setIsAuthenticated, userData } = useAuth();
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentData, loading, error } = useSelector((state) => state.user);
  useEffect(() => {
    dispatch(getUserById({ id }));
    console.log("userData profile>>>>", userData);
  }, [id]);

  useEffect(() => {
    if (currentData) {
      if (currentData._id == userData._id) {
        setIsUserAdmin(true);
        console.log("setIsUserAdmin>>>", isUserAdmin);
        console.log("setIsUserAdmin>>>", currentData._id, userData._id);
      }
    }
  }, [currentData, dispatch]);

  return (
    <Container>
      {loading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : error ? (
        <Space>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Space>
      ) : currentData ? (
        <ProfileHeader>
          <Space>
            <Avatar size={100} src={currentData.profileImg} />
            <Space direction="vertical" size="small">
              <Title level={4}>{currentData.username}</Title>
              <Text>{currentData.name}</Text>
              <Space direction="horizontal" size="small">
                <Title level={5}>{currentData?.posts?.length} Posts</Title>
                <Title level={5}>
                  {currentData?.followers?.length} Followers
                </Title>
                <Title level={5}>{currentData?.following?.length} Posts</Title>
              </Space>
            </Space>
          </Space>
          <Space>
            {isUserAdmin? <Button type="primary">Edit Profile</Button> : null}
          </Space>
        </ProfileHeader>
      ) : (
        <Space>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Space>
      )}

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
