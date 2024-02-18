import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getNotifications } from "../../../store/notifications/api_actions";
import styled from "styled-components";
import Title from "antd/es/typography/Title";
import LoadingSpinner from "../../../components/LoadingSpinner";
import NotificationItem from "./NotificationItem";
import { Space } from "antd";
import Icon from "../../../assets/icons";

const Notifications = () => {
  const dispatch = useDispatch();
  const { notifications, loading, error } = useSelector(
    (state) => state.notification
  );

  useEffect(() => {
    dispatch(getNotifications());
  }, []);

  return (
    <div>
      <StyledWrapper>
        <Title level={4} style={{ marginBottom: "20px" }}>
          Notifications
        </Title>
        {loading ? (
          <LoadingSpinner />
        ) : notifications && notifications.length > 0 ? (
          notifications.map((item, index) => {
            console.log(item);
            return <NotificationItem notification={item} />;
          })
        ) : (
          <Space
            style={{
              color: "#fff",
              width: "100%",
              height: "60vh",
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Icon name="emptyBox" />
            <h3 style={{ color: "#fff" }}>You don't have any notifications yet</h3>
          </Space>
        )}
      </StyledWrapper>
    </div>
  );
};

const StyledWrapper = styled.div`
  margin: 40px auto;
  max-width: 720px;

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
`;

export default Notifications;
