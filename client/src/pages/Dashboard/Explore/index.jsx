import { Col, Row } from "antd";
import React, { Fragment, useEffect } from "react";
import styled from "styled-components";
import PhotoGallery from "./PhotoGallery";
import LoadingSkeleton from "../../../components/LoadingSkeleton";

const Explore = () => {
  return (
    <StyledWrapper>
      <Row>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 16, order: 1 }}>
          <PhotoGallery />
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 8, order: 2 }}>
          Search
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
