import { Card, Col, Skeleton } from "antd";
import Meta from "antd/es/card/Meta";
import React from "react";
import styled from "styled-components";

const LoadingSkeleton = () => {
  return (
    <Col
      xs={{ span: 24 }}
      md={{ span: 8 }}
      lg={{ span: 8 }}
      xl={{ span: 8 }}
      style={{ maxHeight: "300px", minHeight: "150px" }}
    >
      <StyledSkeleton>
        <Card
          style={{ width: "100%", marginTop: 16, padding: "12px" }}
          loading={true}
        >
          <Skeleton loading={true} active avatar>
            <Meta
              avatar={<Skeleton.Avatar active size="large" shape="square" />}
              title={<Skeleton.Input style={{ width: 200 }} active />}
              description={<Skeleton active />}
            />
            <Skeleton.Image style={{ width: "100%" }} />
          </Skeleton>
        </Card>
      </StyledSkeleton>
    </Col>
  );
};

const StyledSkeleton = styled.div`
  .code-box .code-box-demo {
    background-color: #3c3c3c;
    border-radius: 8px 8px 0 0;
  }
  .ant-card {
    color: rgba(0, 0, 0, 0.88);
    background: #161616;
  }
  .ant-card-bordered {
    border: none;
  }
`;
export default LoadingSkeleton;
