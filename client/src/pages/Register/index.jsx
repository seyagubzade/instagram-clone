import React, { useEffect } from "react";
import { LockOutlined, UserOutlined } from "@ant-design/icons";
import { Button, Checkbox, Form, Input, Row, Col } from "antd";
import styled from "styled-components";
import { Content } from "antd/es/layout/layout";
import * as Yup from "yup";
import { useDispatch, useSelector } from "react-redux";
import { useFormik } from "formik";
import { Link, useNavigate } from "react-router-dom";
import { LoginAPI, RegisterAPI } from "../../store/auth/api_request";
import toast from "react-hot-toast";
import Icon from "../../assets/icons";

const validationSchema = Yup.object({
  email: Yup.string()
    .required("Email is required")
    .email("Invalid email format")
    .matches(/@/, "Email must contain @ symbol"),
  password: Yup.string()
    .required("Password is required")
    .min(6, "Password must be at least 6 characters long"),
  name: Yup.string()
    .required("Name is required")
    .min(3, "Name must be at least 3 characters long"),
  username: Yup.string()
    .required("Username is required")
    .min(6, "Username must be at least 6 characters long"),
});

const StyledContent = styled(Content)`
  padding: 0 48px;
  min-height: 100vh;
  max-width: 1120px;
  margin: 0 auto;

  @media screen and (max-width: 480px) {
    padding: 0;
  }
`;

const Register = () => {
  const { data, error } = useSelector((state) => state.auth);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      username: "",
    },
    validationSchema: validationSchema,
    onSubmit: (values) => {
      const { email, password, name, username } = values;
      dispatch(RegisterAPI({ email, password, name, username }));
      formik.resetForm();
    },
  });

  useEffect(() => {
    if (data) {
        localStorage.setItem("authToken", JSON.stringify(data.token));
        localStorage.setItem("mainUser", JSON.stringify(data.user));
      navigate("/home");
    } else if (error) {
      toast.error(error.message, {
        position: "top-right",
        autoClose: 3000,
      });
    }
  }, [data, error]);

  return (
    <StyledContent>
      <Row style={{ padding: "20px" }}>
        <Col xs={{ span: 24, order: 2 }} md={{ span: 12, order: 2 }} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <img
            src="https://media.gcflearnfree.org/content/633d944b3823fb02e84dce55_10_05_2022/Screen%20Shot%202022-10-10%20at%202.28.19%20PM.png"
            alt="Login"
            style={{ maxWidth: "100%" }}
          />
        </Col>
        <Col xs={{ span: 24, order: 1 }} md={{ span: 12, order: 2 }} style={{display:"flex", alignItems:"center", justifyContent:"center"}}>
          <StyledForm>
            <form
              name="normal_login"
              className="login-form"
              onSubmit={formik.handleSubmit}
            >
              <div className="logo">
                <Icon name={"igText"}/>
                <br />
                <h3>Sign up to see photos and videos from your friends.</h3>
              </div>
              <Form.Item
                name="email"
                validateStatus={
                  formik.touched.email && formik.errors.email ? "error" : ""
                }
                help={formik.touched.email && formik.errors.email}
                
              >
                <label htmlFor="email">Email</label>
                <Input
                //   prefix={<UserOutlined className="site-form-item-icon" />}
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
                <label htmlFor="password">Password</label>
                <Input.Password
                //   prefix={<LockOutlined className="site-form-item-icon" />}
                  type="password"
                  placeholder="Password"
                  name="password"
                  value={formik.values.password}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
              <Form.Item
                name="name"
                validateStatus={
                  formik.touched.name && formik.errors.name
                    ? "error"
                    : ""
                }
                help={formik.touched.name && formik.errors.name}
              >
                <label htmlFor="name">Full Name</label>
                <Input
                //   prefix={<LockOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="Name"
                  name="name"
                  value={formik.values.name}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>
              <Form.Item
                name="username"
                validateStatus={
                  formik.touched.username && formik.errors.username
                    ? "error"
                    : ""
                }
                help={formik.touched.username && formik.errors.username}
              >
                <label htmlFor="username">User Name</label>
                <Input
                //   prefix={<LockOutlined className="site-form-item-icon" />}
                  type="text"
                  placeholder="Username"
                  name="username"
                  value={formik.values.username}
                  onChange={formik.handleChange}
                  onBlur={formik.handleBlur}
                />
              </Form.Item>

              <Form.Item>
                <Button
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                  style={{ width: "100%" }}
                >
                  Sign Up
                </Button>
                <br />
                <br />
                Already have an account?{" "}
                <Link to="/login" style={{ color: "#1677ff" }}>
                  Log in
                </Link>
              </Form.Item>
            </form>
          </StyledForm>
        </Col>
      </Row>
    </StyledContent>
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

export default Register;
