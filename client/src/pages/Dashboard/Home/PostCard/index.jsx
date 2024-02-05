import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Card, Avatar, Divider, Space, Typography } from "antd";
import { useFormik } from "formik";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import {
  addComment,
  getPostsFromFollowing,
  likePost,
  unLikePost,
} from "../../../../store/posts/api_action";
import Icon from "../../../../assets/icons";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const PostCard = ({ post }) => {
  const [userData, setUserData] = useState(
    JSON.parse(localStorage.getItem("mainUser")) || null
  );
  const dispatch = useDispatch();
  const formik = useFormik({
    initialValues: {
      text: "",
    },
    onSubmit: (values) => {
      const id = post._id;
      const { text } = values;
      console.log(text, id);
      dispatch(addComment({ text, username: userData.username, id })).then(
        () => {
          dispatch(getPostsFromFollowing());
        }
      );
      //   handleCommentSubmit(id, text);
      formik.resetForm();
    },
  });

  return (
    <StyledCard>
      <Card style={{ marginBottom: 20, padding: "0" }}>
        <Space style={{ margin: "10px 0" }}>
          <Link to={`/users/${post.author._id}`}>
            <Avatar
              src={
                post.author.profileImg ||
                "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
              }
            >
              {post.author.name[0]}
            </Avatar>
            <Space>
              <Title level={5} style={{ display: "flex", marginLeft: "10px" }}>
                {post.author.username}
              </Title>
            </Space>
          </Link>
        </Space>
        <img alt={post.caption} src={post.imageURL} style={{ width: "100%" }} />
        <Meta
          //   avatar={<Avatar>{post.author.name[0]}</Avatar>}
          // title={post.author.name}
          description={
            <Space direction="vertical">
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
                    const id = post._id;
                    const username = userData.username;
                    if (post?.likes.includes(userData._id)) {
                      console.log(true);
                      dispatch(unLikePost({ username, id })).then(() => {
                        dispatch(getPostsFromFollowing());
                      });
                    } else {
                      console.log(true);
                      dispatch(likePost({ username, id })).then(() => {
                        dispatch(getPostsFromFollowing());
                      });
                    }
                  }}
                >
                  {/* {userData._id} */}
                  {post?.likes.includes(userData._id) ? (
                    <Icon name={"filledHeart"} />
                  ) : (
                    <Icon name={"notification"} />
                  )}
                  {post.likes.length}
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
                  {post.comments.length}
                </button>
              </LikesComments>
              <Space style={{ margin: "10px 0" }}>
                <Space>
                  <Title level={5} style={{ display: "flex" }}>
                    {post.author.name}:{" "}
                    <p style={{ margin: "0 0 0 10px" }}>{post.caption}</p>
                  </Title>
                </Space>
              </Space>
              <Text>
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "2-digit",
                })}
              </Text>
            </Space>
          }
        />
        <CommentsList>
          {post?.comments.map((comment) => (
            <Comment key={comment._id}>
              <CommentAuthor>{comment.author.name}</CommentAuthor>
              <CommentText>{comment.text}</CommentText>
            </Comment>
          ))}
        </CommentsList>
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
      </Card>
    </StyledCard>
  );
};
const StyledCard = styled.div`
  margin-bottom: 40px;
  .ant-card-bordered {
    border: none;
  }
  .ant-card {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;
    background: #000;
    border-radius: 0;
  }
  .ant-card-body {
    padding: 0 !important;
    border-radius: 0 !important;
    background: #000;
    color: #fff;
  }
  .ant-card-meta-title {
    color: #fff;
  }
  .ant-card-meta-description {
    color: #fff;
  }
  .ant-typography {
    color: #fff;
    margin-bottom: 0;
  }
  h5 {
    margin: 0;
  }
  .ant-avatar {
    color: #fff;
    background: rgb(157 157 157 / 25%);
  }
  .ant-card-meta-description {
    .ant-space-gap-row-small {
      row-gap: 0;
    }
  }
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
  margin-top: 10px;
  color: #fff;
`;

const CommentsList = styled.div`
  margin-top: 20px;
  color: #fff;
  max-height: 140px;
  overflow-y: auto;
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
      width: 100%;
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

export default PostCard;
