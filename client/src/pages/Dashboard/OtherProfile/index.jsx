import React, { Fragment, useEffect, useState } from "react";
import {
  Avatar,
  Button,
  Card,
  Col,
  ConfigProvider,
  Divider,
  Empty,
  Modal,
  Row,
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
import { getAllPostsByUser } from "../../../store/posts/api_action";
import Meta from "antd/es/card/Meta";
import { Link } from "react-router-dom";
import PostModalContent from "../../../components/PostModalContent";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const { Title, Text } = Typography;

const OtherProfile = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemId, setModalItemId] = useState(null);
  const { mainUserId } = useAuth();
  const [trackUpdate, setTrackUpdate] = useState(false);
  const [mainUserData, setMainUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const [doesFollow, setDoesFollow] = useState(false);
  const dispatch = useDispatch();
  const { id } = useParams();
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );

  const { currentData, loading, error } = useSelector((state) => state.user);
  const {
    posts,
    loading: postLoading,
    error: PostError,
  } = useSelector((state) => state.post);

  const navigate = useNavigate();
  useEffect(() => {
    dispatch(getUserById({ id }));
    dispatch(getAllPostsByUser({ id }));
  }, [id, dispatch]);

  useEffect(() => {
    // if (currentData) {
    //   if (currentData._id === mainUserData._id) {
    //     // navigate(`/profile/${mainUserData._id}`);
    //   } else {
    //     const target = mainUserData.following?.find(
    //       (userId) => userId == currentData?._id
    //     );
    //     if (target) {
    //       setDoesFollow(true);
    //     }
    //   }
    // }
  }, [currentData, dispatch, mainUserData]);

  const followHandle = () => {
    const userIdToFollow = currentData._id;
    dispatch(followUser({ userIdToFollow })).then(() => {
      dispatch(getUserById({ id }));
      setDoesFollow(true);
    });
  };

  const unfollowHandle = () => {
    const userIdToUnfollow = currentData._id;
    dispatch(unfollowUser({ userIdToUnfollow })).then(() => {
      dispatch(getUserById({ id }));
      setDoesFollow(false);
    });
  };

  const showModal = (post) => {
    console.log(post);
    setModalItemId(post._id);
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
              contentBg: "#000",
              borderRadius: "0",
              padding: "0",
              style: {
                backgroundColor: "#000!important",
                color: "#fff",
              },
            },
          },
        }}
      >

        
        {loading ? (
          null
        ) : currentData ? (
          <StyledProfileWrapper>
            <ProfileHeader>
              <Space>
                <Avatar size={100} src={currentData.profileImg || "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"} />
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
              {!currentData?.followers?.includes(userData._id) && (
                <Button type="primary" onClick={followHandle}>
                  Follow
                </Button>
              )}
              {currentData?.followers?.includes(userData._id) && (
                <Button type="primary" onClick={unfollowHandle}>
                  Unfollow
                </Button>
              )}
              <Button type="primary" onClick={()=>navigate('/messages')}>Message</Button>
            </ProfileActions>

            <Divider />
            <PostsContainer>
              <Title level={4}>Posts</Title>
                {posts?.length == 0 && <Title level={5}>No posts yet</Title>}
              <Row gutter={[16, 16]} style={{ marginTop: "20px" }}>
                {postLoading ? (
                  <Fragment>
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                    <LoadingSkeleton />
                  </Fragment>
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
        ) : 
        // (
        //   <Space>
        //     <Empty image={Empty.PRESENTED_IMAGE_SIMPLE} />
        //   </Space>
        // )
        null}

        <Modal
          // title="Basic Modal"
          open={isModalOpen}
          onOk={handleOk}
          onCancel={handleCancel}
          footer={null}
          width={"70%"}
          // style={{background: }}
        >
          <PostModalContent
            modalItemId={modalItemId}
            username={userData.username}
            id={mainUserId}
            trackUpdate={trackUpdate}
            setTrackUpdate={setTrackUpdate}
          />
        </Modal>
      </ConfigProvider>
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
  .ant-modal-content {
    background-color: #000;
  }
  .code-box .code-box-demo {
    background-color: #3c3c3c;
    border-radius: 8px 8px 0 0;
}
`;

const StyledProfileWrapper = styled.div``;

const PostsContainer = styled.div``;

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
