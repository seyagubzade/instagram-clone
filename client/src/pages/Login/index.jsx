import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import styled from "styled-components";
import { Content } from "antd/es/layout/layout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI } from "../../store/auth/api_request";
import toast from "react-hot-toast";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/@/, "Email must contain @ symbol"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
});

const Login = () => {
  const { data, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password } = values;
      console.log(email, password); // You can dispatch your action here
      dispatch(LoginAPI({email, password}))
      formik.resetForm();
    },
  });

  useEffect (() => {
    if (data) {
      localStorage.setItem("authUser", JSON.stringify(data));
      navigate("/")
    } else if (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [data, error]);

  return (
    <Content
      style={{
        padding: "0 48px",
      }}
    >
      <Row style={{ padding: "20px" }}>
        <Col xs={24} md={12}>
          <img
            src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png"
            alt="Login"
            style={{ maxWidth: "100%" }}
          />
        </Col>
        <Col xs={24} md={12}>
          <StyledForm>
            <form
              name="normal_login"
              className="login-form"
              onSubmit={formik.handleSubmit}
            >
              <div className="logo">
                <img
                  src="https://clipart.info/images/ccovers/1522452762Instagram-logo-png-text.png"
                  alt=""
                />{" "}
                <br />
                <h3>Welcome back, log in to your account.</h3>
              </div>
              <Form.Item
                name="email"
                validateStatus={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
                help={formik.touched.email && formik.errors.email}
              >
                <Input
                  prefix={<UserOutlined className="site-form-item-icon" />}
                  placeholder="Email"
                  name="email"
                  value={formik.values.email}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
              <Form.Item
                name="password"
                validateStatus={
                  formik.touched.password && formik.errors.password
                    ? "error"
                    : ""
                }
                help={formik.touched.password && formik.errors.password}
              >
                <Input.Password
                  prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{width:"100%"}}
                >
                  Log in
                </Button>
                <br />
                <br />
                Don't have an account?  <Link to="/register" style={{color: "#1677ff"}}>Sign Up</Link>
              </Form.Item>
            </form>
          </StyledForm>
        </Col>
      </Row>
    </Content>
  );
};

const StyledForm = styled.div`
  display: flex;
  flex-direction: column;
  border: 1px solid rgba(0, 0, 0, 0.2);
  margin: 0 30px;
  padding: 30px;
  background: #fff;
  .logo {
    width: 100%;
    display: flex;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: center;
    text-align: center;
    margin: 20px auto;
    img {
      width: 50%;
      text-align: center;
    }
    h3 {
      margin: 0;
    }
  }
`;

export default Login;
