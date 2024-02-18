import React from "react";
import { Link } from "react-router-dom";
import { Avatar, Typography } from "antd";
import styled from "styled-components";
const { Text } = Typography;

const NotificationItem = ({ notification }) => {
  const { user, byWhom, post, type, content } = notification;

  return (
    <StyledNotification
      style={{ display: "flex", alignItems: "center", marginBottom: "16px" }}
    >
      <Link to={`/users/${byWhom.id}`}>
        <Avatar
          src={byWhom.profileImg}
          size={40}
          style={{ marginRight: "12px" }}
        />
      </Link>
      <div className="content" >
        <Link to={`/users/${byWhom.id}`}>
          <Text strong>{byWhom.username}</Text>
        </Link>
        <Text>{content}</Text>
        {(type === "comment" || type === "like") && (
        //   <Link to={`/post/${post.id}`}>
            <img
              src={post.imageURL}
              alt="Post"
              style={{ height: "60px", marginTop: "8px" }}
            />
        //   </Link>
        )}
      </div>
    </StyledNotification>
  );
};

const StyledNotification = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 16px;
  padding: 12px;
  background: #1f1f1f;
  border-radius: 8px;
  .content{
    flex: 1 1 0%;
    display: flex;
    align-items: center;
    gap: 12px;
    .ant-typography {
        color: #fff;
        flex-grow: 1;
    }
    img{
        border-radius: 4px;
    }
  }
`;
export default NotificationItem;
