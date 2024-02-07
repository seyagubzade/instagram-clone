import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getAllPosts } from "../../../../store/posts/api_action";
import { Row, Col, ConfigProvider, Modal } from "antd";
// import 'antd/dist/antd.css';
import styled from "styled-components";
import { Link } from "react-router-dom";
import PostModalContent from "../../../../components/PostModalContent";

const PhotoGallery = () => {
  const { posts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalItemId, setModalItemId] = useState(null);
  const [trackUpdate, setTrackUpdate] = useState(false);

  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  useEffect(() => {
    dispatch(getAllPosts());
  }, [dispatch]);

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
    <StyledGallery className="photo-gallery">
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
        <Row gutter={10}>
          {posts?.map((image, index) => (
            <Col key={image._id} xs={12} lg={8} style={{ padding: "5px" }}>
              <Link className="photo-item" onClick={() => showModal(image)}>
                <img
                  src={image.imageURL}
                  alt={image.caption}
                  className="photo-img"
                />
              </Link>
            </Col>
          ))}
        </Row>
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
            id={userData._id}
            trackUpdate={trackUpdate}
            setTrackUpdate={setTrackUpdate}
          />
        </Modal>
      </ConfigProvider>
    </StyledGallery>
  );
};

const StyledGallery = styled.div`
  padding: 20px;
  img {
    width: 100%;
    height: 100px;
    object-fit: cover;
  }
  @media screen and (min-width: 460px) {
    img {
      height: 150px;
    }
  }
  @media screen and (min-width: 780px) {
    img {
      height: 200px;
    }
  }
  @media screen and (min-width: 920px) {
    img {
      height: 250px;
    }
  }
  @media screen and (min-width: 992px) {
    img {
      height: 150px;
    }
  }
  @media screen and (min-width: 1320px) {
    img {
      height: 250px;
    }
  }
`;

export default PhotoGallery;
