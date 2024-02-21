import { Button, Col, Input, Modal, Row, Spin } from "antd";
import { useFormik } from "formik";
import React, { Fragment, useEffect, useState } from "react";
import styled from "styled-components";
import * as Yup from "yup";
import Icon from "../../assets/icons";
import {
  addComment,
  deletePostById,
  getPostById,
  likePost,
  unLikePost,
} from "../../store/posts/api_action";
import { useDispatch, useSelector } from "react-redux";
import LoadingSpinner from "../LoadingSpinner";
import { ExclamationCircleFilled, DeleteOutlined } from "@ant-design/icons";
import { useNavigate } from "react-router";
import { getUserById } from "../../store/users/api_request";
import { useMediaQuery } from "react-responsive";
const { confirm } = Modal;

const PostModalContent = ({
  modalItemId,
  username,
  trackUpdate,
  setTrackUpdate,
  setIsModalOpen,
}) => {
  const isMobileOnly = useMediaQuery({ query: "(max-width: 480px)" });
  const dispatch = useDispatch();
  const { currentPost, loading } = useSelector((state) => state.post);
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const navigate = useNavigate();
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      const { text } = values;
      dispatch(addComment({ text, username, id: modalItemId })).then(() => {
        dispatch(getPostById({ id: modalItemId }));
        setTrackUpdate(!trackUpdate);
        formik.resetForm();
      });
    },
  });

  useEffect(() => {
    dispatch(getPostById({ id: modalItemId }));
  }, [modalItemId, dispatch]);

  const showDeleteConfirm = () => {
    confirm({
      title: "Are you sure delete this post?",
      icon: <ExclamationCircleFilled />,
      content: "To delete the post, please",
      okText: "Yes",
      okType: "danger",
      cancelText: "No",
      onOk() {
        dispatch(deletePostById({ id: modalItemId })).then(() => {
          setIsModalOpen(false);
          navigate(`/profile/${userData._id}`);
          setTrackUpdate(!trackUpdate);
        });
      },
      onCancel() {
        console.log("Cancel");
      },
      className: "delete-modal",
      okButtonProps: {
        className: "delete-modal",
      },
    });
  };

  return (
    <ModalContentContainer>
      <Row gutter={[16, 16]} style={{ width: "100%" }}>
        {currentPost && console.log("currentPost>>>", currentPost)}
        {loading ? (
          <LoadingSpinner />
        ) : currentPost ? (
          <Fragment>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <ModalImage
                src={currentPost?.imageURL}
                alt={currentPost?.caption}
                style={{ objectFit: "contain" }}
              />
            </Col>
            <Col xs={{ span: 24 }} md={{ span: 12 }}>
              <ModalDetails>
                <div>
                  <AuthorName>
                    <p>
                      <span>{currentPost?.author.name}</span>{" "}
                      {currentPost?.caption}
                    </p>
                    {currentPost.author._id === userData._id && (
                      <Button
                        onClick={showDeleteConfirm}
                        type="dashed"
                        className="delete-btn"
                      >
                        <DeleteOutlined />
                      </Button>
                    )}
                  </AuthorName>{" "}
                  <CreationTime>
                    {new Date(currentPost?.createdAt).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "2-digit",
                      }
                    )}
                  </CreationTime>
                  <LikesComments>
                    <button
                      style={{
                        background: "none",
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                      onClick={() => {
                        const id = currentPost._id;
                        if (currentPost?.likes.includes(userData._id)) {
                          console.log(true);
                          dispatch(unLikePost({ username, id })).then(() => {
                            dispatch(getPostById({ id: modalItemId }));
                          });
                        } else {
                          console.log(true);
                          dispatch(likePost({ username, id })).then(() => {
                            dispatch(getPostById({ id: modalItemId }));
                          });
                        }
                      }}
                    >
                      {/* {userData._id} */}
                      {currentPost?.likes.includes(userData._id) ? (
                        <Icon name={"filledHeart"} />
                      ) : (
                        <Icon name={"notification"} />
                      )}
                      {currentPost.likes.length}
                    </button>{" "}
                    <button
                      style={{
                        background: "none",
                        outline: "none",
                        border: "none",
                        cursor: "pointer",
                        color: "#fff",
                      }}
                    >
                      <Icon name={"comment"} />
                      {currentPost.comments.length}
                    </button>
                  </LikesComments>
                  <CommentsList>
                    {currentPost?.comments.map((comment) => (
                      <Comment key={comment._id}>
                        <CommentAuthor>{comment.author.name}</CommentAuthor>
                        <CommentText>{comment.text}</CommentText>
                      </Comment>
                    ))}
                  </CommentsList>
                </div>
                <AddCommentForm>
                  <form onSubmit={formik.handleSubmit}>
                    <svg
                      width="24"
                      height="24"
                      viewBox="0 0 24 24"
                      fill="none"
                      xmlns="http://www.w3.org/2000/svg"
                    >
                      <path
                        d="M15.182 15.182C13.4246 16.9393 10.5754 16.9393 8.81802 15.182M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12ZM9.75 9.75C9.75 10.1642 9.58211 10.5 9.375 10.5C9.16789 10.5 9 10.1642 9 9.75C9 9.33579 9.16789 9 9.375 9C9.58211 9 9.75 9.33579 9.75 9.75ZM9.375 9.75H9.3825V9.765H9.375V9.75ZM15 9.75C15 10.1642 14.8321 10.5 14.625 10.5C14.4179 10.5 14.25 10.1642 14.25 9.75C14.25 9.33579 14.4179 9 14.625 9C14.8321 9 15 9.33579 15 9.75ZM14.625 9.75H14.6325V9.765H14.625V9.75Z"
                        stroke="white"
                        stroke-width="1.5"
                        stroke-linecap="round"
                        stroke-linejoin="round"
                      />
                    </svg>

                    <input
                      type="text"
                      placeholder="Add comment..."
                      name="text"
                      value={formik.values.text}
                      onChange={formik.handleChange}
                      onBlur={formik.handleBlur}
                    />
                    <button>Post</button>
                  </form>
                </AddCommentForm>
              </ModalDetails>
            </Col>
          </Fragment>
        ) : null}
      </Row>
    </ModalContentContainer>
  );
};

const ModalContentContainer = styled.div`
  width: 100%;
  min-height: 60vh;
  display: flex;
  align-items: center;
  justify-content: center;

  .ant-modal-confirm-body-wrapper {
    padding: 12px !important;
  }
  .ant-modal-content {
    position: relative;
    background-color: #000;
    border: 0;
    border-radius: 0;
    box-shadow: 0 6px 16px 0 rgba(0, 0, 0, 0.08),
      0 3px 6px -4px rgba(0, 0, 0, 0.12), 0 9px 28px 8px rgba(0, 0, 0, 0.05);
    pointer-events: auto;
    color: #fff;
    padding: 0;
  }
  .delete-btn {
    padding: 4px 12px;
    line-height: 1;
    color: white;
    background: transparent;
    border: 1px solid white;
    font-size: 12px;
    font-weight: 200;
  }
  .ant-btn-dashed:not(:disabled):not(.ant-btn-disabled):hover {
    color: red;
    border-color: red;
  }
  .delete-modal {
    padding: 12px !important;
    border-radius: 12px;
    overflow: hidden;
  }
  @media (min-width: 768px) {
    display: flex;
  }
`;

const ModalImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
`;

const ModalDetails = styled.div`
  padding: 0 20px;
  color: #fff;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  height: 100%;
`;

const AuthorName = styled.div`
  margin: 20px 0 0;
  display: flex;
  align-items: flex-start;
  gap: 6px;
  span {
    font-size: 16px;
    font-weight: bold;
    margin: 0;
  }
  p {
    margin: 0;
    font-size: 18px;
  }
  color: #fff;
`;

const CreationTime = styled.div`
  font-size: 14px;
  color: rgba(255, 255, 255, 0.8);
  margin-bottom: 10px;
`;

const LikesComments = styled.div`
  display: flex;
  gap: 16px;
  button {
    display: flex;
    align-items: center;
    gap: 4px;
    font-size: 16px;
  }
  margin-bottom: 10px;
  color: #fff;
`;

const CommentsList = styled.div`
  margin-top: 20px;
  color: #fff;
  overflow-y: auto;
  max-height: 250px;
  @media screen and (max-width: 480px) {
    max-height: 70px;
  }
  @media screen and (max-width: 720px) {
    max-height: 120px;
  }
`;

const Comment = styled.div`
  margin-bottom: 10px;
  color: #fff;
`;

const CommentAuthor = styled.span`
  font-weight: bold;
  color: #fff;
`;

const CommentText = styled.span`
  margin-left: 5px;
  color: #fff;
`;

const AddCommentForm = styled.div`
  margin-top: 20px;
  color: #fff;
  display: flex;
  width: 100%;
  border-top: 1px solid rgba(255, 255, 255, 0.2);
  padding: 10px 0;
  form {
    width: 100%;
    display: flex;
    align-items: center;
    input {
      width: 80%;
      padding: 10px 14px 10px 10px;
      border: none;
      outline: none;
      color: #fff;
      background: #000;
      font-size: 14px;
    }
    button {
      background: none;
      outline: none;
      border: none;
      color: #fff;
      cursor: pointer;
    }
  }
`;

export default PostModalContent;
