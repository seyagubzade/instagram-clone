import React, { useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Empty,
  Modal,
  Row,
  Skeleton,
  Space,
  Typography,
  ConfigProvider,
} from "antd";
import styled from "styled-components";
import { useAuth } from "../../../context/UserAuthContext";
import { useDispatch, useSelector } from "react-redux";
import {
  followUser,
  getUserById,
  unfollowUser,
} from "../../../store/users/api_request";
import { useParams } from "react-router";
import { getAllPostsByUser } from "../../../store/posts/api_action";
import { Card } from "antd";
import { Link } from "react-router-dom";
import PostModalContent from "../../../components/PostModalContent";

const { Meta } = Card;

const { Title, Text } = Typography;

const Profile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItem, setModalItem] = useState(null);
  const { mainUserId } = useAuth();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const dispatch = useDispatch();
  const { id } = useParams();
  const { currentData, loading, error } = useSelector((state) => state.user);
  const [trackUpdate, setTrackUpdate] = useState(false)
  const {
    posts,
    loading: postLoading,
    error: PostError,
  } = useSelector((state) => state.post);

  useEffect(() => {
    dispatch(getUserById({ id }));
    dispatch(getAllPostsByUser({ id }));
  }, [id, dispatch, trackUpdate]);

  useEffect(() => {
    if (currentData) {
      setUserData(currentData);
      localStorage.setItem("mainUser", JSON.stringify(currentData));
    }
  }, [currentData]);

  const followHandle = () => {
    dispatch(followUser(currentData._id));
  };

  const unfollowHandle = () => {
    dispatch(unfollowUser(currentData._id));
  };

  const showModal = (post) => {
    setModalItem(post);
    setIsModalOpen(true);
  };
  const handleOk = () => {
    setIsModalOpen(false);
  };
  const handleCancel = () => {
    setIsModalOpen(false);
  };

  return (
    <Container>
      <ConfigProvider
        theme={{
          components: {
            Modal: {
              contentBg:"#000",
              borderRadius: "0",
              padding: "0",
              style: {
                backgroundColor: "#000\!important",
                color: "#fff",
                
              },
            },
          },
        }}
      >
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
          <StyledProfileWrapper>
            <ProfileHeader>
              <Space style={{flexWrap:"wrap"}}>
                <Avatar
                  size={100}
                  src={
                    currentData.profileImg
                      ? currentData.profileImg
                      : "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
                  }
                />
                <Space direction="vertical" size="small">
                  <Title level={4}>{currentData.username}</Title>
                  <Text>{currentData.name}</Text>
                  <Space direction="horizontal" size="small">
                    <Title level={5}>
                      {currentData?.posts?.length} Posts
                    </Title>
                    <Title level={5}>
                      {currentData?.followers?.length} Followers
                    </Title>
                    <Title level={5}>
                      {currentData?.following?.length} Following
                    </Title>
                  </Space>
                </Space>
              </Space>
              <Space style={{marginTop:"10px"}}>
                <Button type="primary">Edit Profile</Button>
              </Space>
            </ProfileHeader>
            <Divider />
            <PostsContainer>
              <Title level={4}>Posts</Title>
              <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {loading ? (
                  <Card style={{ width: 300, marginTop: 16 }} loading={true}>
                    <Skeleton loading={true} active avatar>
                      <Meta
                        avatar={
                          <Skeleton.Avatar
                            active
                            size="large"
                            shape="square"
                          />
                        }
                        title={
                          <Skeleton.Input style={{ width: 200 }} active />
                        }
                        description={<Skeleton active />}
                      />
                      <Skeleton.Image style={{ width: "100%" }} />
                    </Skeleton>
                  </Card>
                ) : posts ? (
                  [...posts].reverse().map((post, index) => (
                    <Col
                      key={index}
                      xs={{ span: 12 }}
                      md={{ span: 8 }}
                      lg={{ span: 8 }}
                      xl={{ span: 8 }}
                      style={{ maxHeight: "300px", minHeight: "150px" }}
                    >
                      {/* {post.caption} */}
                      <Link onClick={() => showModal(post)}>
                        <img
                          src={post.imageURL}
                          alt=""
                          style={{
                            width: "100%",
                            height: "100%",
                            objectFit: "cover",
                          }}
                        />
                      </Link>
                    </Col>
                  ))
                ) : (
                  ""
                )}
              </Row>
            </PostsContainer>
          </StyledProfileWrapper>
        ) : (
          <Space>
            <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
          </Space>
        )}

        <Modal
          // title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={"70%"}
        >
          <PostModalContent modalItem={modalItem} username={userData.username} id={mainUserId} trackUpdate={trackUpdate} setTrackUpdate={setTrackUpdate}/>
        </Modal>
      </ConfigProvider>
    </Container>
  );
};

const Container = styled.div`
  max-width: 720px;
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

const PostsContainer = styled.div``;

const ProfileHeader = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  flex-wrap: wrap;
`;

const ProfileActions = styled.div`
  margin-top: 20px;
  text-align: left;
  display: flex;
  padding: 0 0 0 120px;
  gap: 12px;
`;

export default Profile;
