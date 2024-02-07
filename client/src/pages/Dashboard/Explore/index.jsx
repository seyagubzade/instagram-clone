import { Col, Row } from "antd";
import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import PhotoGallery from "./PhotoGallery";
import LoadingSkeleton from "../../../components/LoadingSkeleton";
import SearchUsers from "./SearchUsers";

const Explore = () => {
  return (
    <StyledWrapper>
      <Row>
        <Col xs={{ span: 24, order: 2 }} lg={{ span: 16, order: 1 }}>
          <PhotoGallery />
        </Col>
        <Col xs={{ span: 24, order: 1 }} lg={{ span: 8, order: 2 }} style={{position:"relative"}}>
          <SearchUsers />
        </Col>
      </Row>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  max-width: 1280px;
  margin: 0 auto;
`;

export default Explore;
