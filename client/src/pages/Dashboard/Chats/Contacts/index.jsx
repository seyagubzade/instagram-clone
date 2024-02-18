import React, { useEffect, useState } from "react";
import { Form, Input, Button, Card, Space, Avatar } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import Icon from "../../../../assets/icons";
import {
  getAllUsers,
  searchUserByUsername,
} from "../../../../store/users/api_request";
import { Link } from "react-router-dom";

const { TextArea } = Input;

const Contacts = ({ changeChat }) => {
  const dispatch = useDispatch();
  const { data } = useSelector((state) => state.user);
  const [searchInput, setSearchInput] = useState("");
  const [currentSelected, setCurrentSelected] = useState(undefined);
  const [otherUsers, setOtherUsers] = useState([]);
  const mainUserId = JSON.parse(localStorage.getItem("mainUser"))._id

  useEffect(() => {
    dispatch(getAllUsers());
  }, []);

  useEffect(() => {
    if (data) {
      setOtherUsers(() =>
        data.filter(
          (user) =>
            user._id !== mainUserId
        )
      );
    }
  }, [data]);

  const handleSearch = (value) => {
    setSearchInput(value);
    if (!value) {
      dispatch(getAllUsers());
    } else {
      let username = value.trim();
      dispatch(searchUserByUsername({ username }));
    }
  };

  const changeCurrentChat = (index, user) => {
    setCurrentSelected(index);
    changeChat(user);
  };

  return (
    <StyledWrapper>
      <Form layout="vertical">
        <Form.Item name="username">
          <Input
            type="text"
            placeholder="Search"
            value={searchInput}
            onChange={(e) => handleSearch(e.target.value)}
            prefix={<Icon name={"search"} />}
            size="large"
          />
        </Form.Item>
      </Form>

      <StyledSearchResult>
        {otherUsers.length>0 &&
          otherUsers?.map((user, index) => (
            <Card
              key={user._id}
              style={{ marginBottom: 12, padding: "0" }}
              onClick={() => changeCurrentChat(index, user)}
            >
              <Space style={{ margin: "10px 0" }}>
                {/* <Link to={`/users/${user._id}`}> */}
                <Avatar
                  src={
                    user.profileImg ||
                    "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
                  }
                >
                  {user.username}
                </Avatar>
                <Space>
                  <Title
                    level={5}
                    style={{ display: "flex", marginLeft: "10px" }}
                  >
                    {user.username}
                  </Title>
                </Space>
                {/* </Link> */}
              </Space>
            </Card>
          ))}
      </StyledSearchResult>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 30px 10px;
  position: sticky;
  top: 0;
  max-height: 100vh;
  .ant-typography {
    color: #fff;
  }
  label {
    color: #fff;
  }
  .ant-form-item,
  .ant-form-item-label > label {
    color: rgba(255, 255, 255, 0.88);
  }
  .ant-input-outlined {
    background: #1c1c1c;
    border-width: 1px;
    border-style: solid;
    border-color: #2f2f2f;
    color: rgba(255, 255, 255, 0.88);
  }
  input::placeholder {
    color: rgba(255, 255, 255, 0.58);
  }
  &::-webkit-input-placeholder {
    color: rgba(255, 255, 255, 0.88);
  }
  @media screen and (min-width: 992px) {
    padding: 30px 10px;
  }
`;

const StyledSearchResult = styled.div`
  height: max-content;
  overflow-y: auto;
  padding-right: 5px;
  .ant-card {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;
    background: #000;
    border-radius: 8px;
    overflow: hidden;
  }
  .ant-card-bordered {
    border: none !important;
  }
  .ant-card-body {
    padding: 0 12px !important;
    border-radius: 0 !important;
    background: #121212;
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
  @media screen and (min-width: 992px) {
    height: 88vh !important;
    max-height: 88vh;
  }
`;

export default Contacts;
