import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import * as Yup from "yup";
import {
  getUserById,
  updateUserProfile,
} from "../../../store/users/api_request";

const { TextArea } = Input;

const validationSchema = Yup.object({
  profileImg: Yup.string().url("Invalid URL").required("Required"),
  username: Yup.string().required("Required"),
  name: Yup.string().required("Required"),
  email: Yup.string().required("Required"),
  password: Yup.string().required(
    "You must type your password to save profile changes."
  ),
});

const EditProfile = () => {
  const { id } = useParams();
  const { currentData, loading, error } = useSelector((state) => state.user);
  const dispatch = useDispatch();
  const [form] = Form.useForm(); // Obtain the form instance
  const naviagate = useNavigate();
  const formik = useFormik({
    initialValues: {
      email: "",
      password: "",
      name: "",
      username: "",
      profileImg: "",
    },
    validationSchema,
    onSubmit: (values) => {
      const { email, password, name, username, profileImg } = values;
      dispatch(
        updateUserProfile({ email, password, name, username, profileImg })
      ).then(() => {
        naviagate(`/profile/${id}`);
      });
    // console.log(values)
    },
  });

  useEffect(() => {
    dispatch(getUserById({ id }));
  }, [id]);

  useEffect(() => {
    if (currentData) {
      formik.setValues({
        email: currentData.email,
        password: "",
        name: currentData.name,
        username: currentData.username,
        profileImg: currentData.profileImg,
      });

      form.setFieldsValue({
        email: currentData.email,
        name: currentData.name,
        username: currentData.username,
        profileImg: currentData.profileImg,
      });
    }
  }, [currentData]);

  return (
    <StyledWrapper>
      <Title level={4}>Edit Profile Info</Title>
      <Form
        layout="vertical"
        form={form} // Provide the form instance to the Form component
        onFinish={formik.handleSubmit}
      >
        <Form.Item
          label="Image URL"
          name="profileImg"
          validateStatus={
            formik.errors.profileImg && formik.touched.profileImg ? "error" : ""
          }
          help={
            formik.errors.profileImg &&
            formik.touched.profileImg &&
            formik.errors.profileImg
          }
        >
          <Input
            name="profileImg"
            value={formik.values.profileImg}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Username"
          name="username"
          validateStatus={
            formik.errors.username && formik.touched.username ? "error" : ""
          }
          help={
            formik.errors.username &&
            formik.touched.username &&
            formik.errors.username
          }
        >
          <Input
            name="username"
            value={formik.values.username}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Name"
          name="name"
          validateStatus={
            formik.errors.name && formik.touched.name ? "error" : ""
          }
          help={formik.errors.name && formik.touched.name && formik.errors.name}
        >
          <Input
            name="name"
            value={formik.values.name}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Email"
          name="email"
          validateStatus={
            formik.errors.email && formik.touched.email ? "error" : ""
          }
          help={
            formik.errors.email && formik.touched.email && formik.errors.email
          }
        >
          <Input
            name="email"
            value={formik.values.email}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            readOnly
          />
        </Form.Item>
        <Form.Item
          label="Password"
          name="password"
          validateStatus={
            formik.errors.password && formik.touched.password ? "error" : ""
          }
          help={
            formik.errors.password &&
            formik.touched.password &&
            formik.errors.password
          }
        >
          <Input.Password
            name="password"
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Save Changes
          </Button>
        </Form.Item>
      </Form>
    </StyledWrapper>
  );
};

const StyledWrapper = styled.div`
  margin: 40px;
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
  .anticon anticon-eye ant-input-password-icon {
    color: #9d9d9d;
  }
`;

export default EditProfile;
