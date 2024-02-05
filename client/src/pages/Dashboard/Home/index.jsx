import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { Spin, Card, Avatar, Divider, Space, Typography } from "antd";
// import { getPostsFromFollowing, addComment } from "../../../store/posts/api_action";
// import moment from "moment";
import { useFormik } from "formik";
import PostCard from "./PostCard";
import {
  addComment,
  getPostsFromFollowing,
} from "../../../store/posts/api_action";
import styled from "styled-components";
import Title from "antd/es/skeleton/Title";
import { Link } from "react-router-dom";

const { Meta } = Card;
const { Text } = Typography;

const Home = () => {
  const { followingPosts, loading, error } = useSelector((state) => state.post);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getPostsFromFollowing());
  }, [dispatch]);

  // const handleCommentSubmit = (id, text) => {
  //   const username = JSON.parse(localStorage.getItem("mainUser")).username; // Change this with your actual username
  //   dispatch(addComment(text, username, id));
  // };

  return (
    <StyledWrapper>
      {followingPosts.length == 0 && (
        <Space>
          <Title>
            You are not following any users, <br /> 
          </Title>
          <Link to={"/explore"}>start exploring now</Link>
        </Space>
      )}
      {false ? (
        <Spin size="large" />
      ) : (
        <StyledCards>
          {followingPosts.map((post) => (
            <PostCard
              key={post._id}
              post={post}
              // handleCommentSubmit={handleCommentSubmit}
            />
          ))}
        </StyledCards>
      )}
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin-top: 40px;
`;

const StyledCards = styled.div`
  max-width: 500px;
  margin: 0 auto;
`;

export default Home;
