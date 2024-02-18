import React, { useEffect, useRef, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import styled from "styled-components";
import {
  getMessages,
  sendMessage,
} from "../../../../store/messages/api_actions";
import { Avatar, Card, Space } from "antd";
import { Link } from "react-router-dom";
import Title from "antd/es/typography/Title";
import { formatTime } from "../../../../utils/formatTime";
import { v4 as uuidv4 } from "uuid";

const ChatContainer = ({ currentChat, socket }) => {
  const [text, setText] = useState("");
  const [messages, setMessages] = useState([]);
  const [receivedMessage, setReceivedMessage] = useState(null);
  const dispatch = useDispatch();
  const { message, arrivalMessage } = useSelector((state) => state.message);
  const mainUser = JSON.parse(localStorage.getItem("mainUser"));
  const scrollRef = useRef();

  const getAllMessages = async () => {
    dispatch(getMessages({ recipientId: currentChat._id }));
  };

  useEffect(() => {
    if(currentChat){
        getAllMessages();
    }
  }, [currentChat]);

  useEffect(() => {
    if (message) {
      setMessages(message?.data);
    }
  }, [message]);

  const handleMessageSubmit = (e) => {
    e.preventDefault();
    if (text !== "") {
      const data = {
        message: text,
        recipientId: currentChat._id,
        // senderId: mainUser._id,
      };
      dispatch(sendMessage(data));
      socket.current.emit("send-message", { ...data, senderId: mainUser._id });
      const newMessagesArr = [...messages];
      newMessagesArr.push({
        createdAt: new Date().toISOString(),
        sender: mainUser._id,
        recipient: currentChat._id,
        message:{
            text: text
        },
        status: 'sent',
        messageType: 'text',
      });
        setText("");
        setMessages(newMessagesArr)

    }
  };

  useEffect(()=>{
    if(socket.current){
        socket.current.on("recieve-message", (msg)=>{
            console.log("new message>>>",msg)
            setReceivedMessage(msg)
        })
    }
  },[])

  useEffect(()=>{
    receivedMessage && setMessages((prev)=>[...prev, receivedMessage])
  },[receivedMessage])

  useEffect(() => {
    scrollRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  return (
    <StyledWrapper>
      <StyledMessageHeader
        key={currentChat._id}
        style={{
          marginBottom: 12,
          padding: "0",
          border: "none",
          background: "#000",
        }}
      >
        <Space style={{ margin: "10px 0"}}>
          <Link to={`/users/${currentChat._id}`}>
            <Avatar
              src={
                currentChat.profileImg ||
                "https://img.myloview.com/stickers/default-avatar-profile-icon-vector-social-media-user-photo-700-205577532.jpg"
              }
            >
              {currentChat.username}
            </Avatar>
            <Space>
              <Title level={5} style={{ display: "flex", marginLeft: "10px" }}>
                {currentChat.username}
              </Title>
            </Space>
          </Link>
        </Space>
      </StyledMessageHeader>
      <MessagesPanel>
        {messages?.map((item, index) => {
          const time = formatTime(item.createdAt);
          return (
            <div ref={scrollRef} key={index}>
              <div
                className={`message ${
                  item.sender === mainUser._id ? "sended" : "recieved"
                }`}
              >
                <div className="content ">
                  <p>{item.message.text}</p>
                </div>
                <span className="msg-time">{time}</span>
              </div>
            </div>
          );
        })}
      </MessagesPanel>
      <AddCommentForm>
        <form onSubmit={handleMessageSubmit}>
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
            value={text}
            onChange={(e) => setText(e.target.value)}
          />
          <button>Send</button>
        </form>
      </AddCommentForm>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  padding: 30px 10px;
  height: 100vh;
  display: flex;
  flex-direction: column;
`;

const StyledMessageHeader = styled(Card)`
  height: 90px;
  padding-right: 5px;
  /*overflow: hidden;*/
  .ant-card {
    box-sizing: border-box;
    margin: 0;
    padding: 0;
    color: #fff;
    font-size: 14px;
    background: #000;
    border-radius: 0px;
    overflow: hidden;
  }
  .ant-card-bordered {
    border: transparent !important;
  }
  .ant-card-body {
    padding: 0 12px !important;
    border-radius: 0 !important;
    background: #121212;
    color: #fff;
    cursor: pointer;
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
`;
const MessagesPanel = styled.div`
  flex-grow: 1;
  overflow-x: hidden;
  overflow-y: scroll;
  .message {
    display: flex;
    align-items: center;
    flex-direction: column;
    margin-bottom: 12px;
    .msg-time {
      color: rgba(255, 255, 255, 0.6);
      font-size: 11px;
      margin: 6px;
    }
    .content {
      max-width: 40%;
      overflow-wrap: break-word;
      padding: 0 14px;
      font-size: 14px;
      color: #d1d1d1;

      @media screen and (min-width: 720px) and (max-width: 1080px) {
        max-width: 70%;
      }
    }
  }
  .sended {
    align-items: flex-end;
    margin-right: 12px;
    .content {
      background-color: #0080ff;
      border-radius: 8px 8px 0 8px;
    }
  }
  .recieved {
    align-items: flex-start;
    .content {
      background-color: #303030;
      border-radius: 8px 8px 8px 0;
    }
  }
`;

const AddCommentForm = styled.div`
  margin-top: 20px;
  margin-bottom: 20px;
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
      width: 20%;
      background: none;
      outline: none;
      border: none;
      color: #fff;
      cursor: pointer;
      text-align: center;
    }
  }
`;

export default ChatContainer;
