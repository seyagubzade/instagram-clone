import React from "react";
import NotFoundIMG from "../../assets/images/NotFound.png";
import { Button } from "antd";
import { Link } from "react-router-dom";
import styled from "styled-components";

const NotFound = () => {
  return (
    <Container>
      <img src={NotFoundIMG} alt="Not Found" />
      <Button>
        <Link to={"/home"}>Go to Back</Link>
      </Button>
    </Container>
  );
};

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  background: #000;
  height: 80vh;

  img {
    width: 300px;
    height: auto;
    margin: 20px auto 0;

    @media screen and (min-width: 480px) {
      width: 400px;
      margin: 40px auto 0;
    }
    @media screen and (min-width: 720px) {
      width: 50%;
      margin: 40px auto 0;
    }
  }

  button {
    margin-top: 20px;
  }
`;

export default NotFound;
