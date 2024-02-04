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
import {
  followUser,
  getUserById,
  unfollowUser,
} from "../../../store/users/api_request";
import { useNavigate, useParams } from "react-router";

const { Title, Text } = Typography;

const OtherProfile = () => {
  const { mainUserId } = useAuth();
  const [mainUserData, setMainUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const [doesFollow, setDoesFollow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentData, loading, error } = useSelector((state) => state.user);
  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserById({ id }));
  }, [id]);

  useEffect(() => {
    if (currentData) {
      if (currentData._id === mainUserId) {
        navigate(`/profile/${mainUserId}`);
      } else {
        const target = mainUserData.following?.find(
          (userId) => userId == currentData?._id
        );
        if (target) {
          setDoesFollow(true);
        }
      }
    }
  }, [currentData]);

  const followHandle = () => {
    // clg
    const userIdToFollow = currentData._id;
    dispatch(followUser({ userIdToFollow}));
  };

  const unfollowHandle = () => {
    const userIdToUnfollow = currentData._id
    dispatch(unfollowUser({ userIdToUnfollow }));
  };

  return (
    <Container>
      {loading ? (
        <Skeleton
          avatar
          paragraph={{
            rows: 4,
          }}
        />
      ) : currentData ? (
        <StyledProfileWrapper>
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
                  <Title level={5}>
                    {currentData?.following?.length} Following
                  </Title>
                </Space>
              </Space>
            </Space>
            <Space></Space>
          </ProfileHeader>
          <ProfileActions>
            {!doesFollow && (
              <Button type="primary" onClick={followHandle}>
                Follow
              </Button>
            )}
            {doesFollow && (
              <Button type="primary" onClick={unfollowHandle}>
                Unfollow
              </Button>
            )}
            <Button type="primary">Message</Button>
          </ProfileActions>

          <Divider />
        </StyledProfileWrapper>
      ) : (
        <Space>
          <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        </Space>
      )}
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
  .ant-divider {
    color: rgba(255, 255, 255, 0.4) !important;
    height: 2px;
  }
`;

const StyledProfileWrapper = styled.div``;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const ProfileActions = styled.div`
  margin-top: 20px;
  text-align: left;
  display: flex;
  padding: 0 0 0 120px;
  gap: 12px;
`;

export default OtherProfile;
