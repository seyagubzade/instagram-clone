import React from "react";
import { Form, Input, Button } from "antd";
import { useFormik } from "formik";
import * as Yup from "yup";
import Title from "antd/es/typography/Title";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import { createPost } from "../../../store/posts/api_action";

const { TextArea } = Input;

const initialValues = {
  imageURL:
    "https://www.rbsdirect.com.br/imagesrc/26217341.jpg?version=1575255600",
  caption: "selling paper like there is no another day!",
};

const validationSchema = Yup.object({
  imageURL: Yup.string().url("Invalid URL").required("Required"),
  caption: Yup.string().required("Required"),
});

const Create = () => {
  const dispatch = useDispatch()
  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: (values) => {
      const {imageURL,caption} = values
      dispatch(createPost({imageURL,caption}))
    },
  });

  return (
    <StyledWrapper>
      <Title level={4}>Create new post</Title>
      <Form
        layout="vertical"
        onFinish={formik.handleSubmit}
        initialValues={initialValues}
      >
        <Form.Item
          label="Image URL"
          name="imageURL"
          validateStatus={
            formik.errors.imageURL && formik.touched.imageURL ? "error" : ""
          }
          help={
            formik.errors.imageURL &&
            formik.touched.imageURL &&
            formik.errors.imageURL
          }
        >
          <Input
            name="imageURL"
            value={formik.values.imageURL}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
          />
        </Form.Item>
        <Form.Item
          label="Caption"
          name="caption"
          validateStatus={
            formik.errors.caption && formik.touched.caption ? "error" : ""
          }
          help={
            formik.errors.caption &&
            formik.touched.caption &&
            formik.errors.caption
          }
        >
          <TextArea
            name="caption"
            value={formik.values.caption}
            onChange={formik.handleChange}
            onBlur={formik.handleBlur}
            rows={4}
          />
        </Form.Item>
        <Form.Item>
          <Button type="primary" htmlType="submit">
            Submit
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
`;
export default Create;
