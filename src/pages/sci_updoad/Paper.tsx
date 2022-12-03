import { TUploadFile } from "@/components/upload/TUploadFile";
import styled from "@emotion/styled";
import { Button, Card, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { CardCon } from ".";

export const Paper = () => {
  const onFinish = (values:{}) => {

  }
  const [FileUrl, setFileUrl] = useState("");
  return (
    <CardCon>
      <Card style={{ width: "90rem" }}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          
        >
          <Form.Item label="姓名">
            <Input />
          </Form.Item>
          <Form.Item label="邮箱">
            <Input />
          </Form.Item>
          <Form.Item label="联系电话">
            <Input />
          </Form.Item>
          <Form.Item label="论文简介">
            <TextArea rows={2} placeholder={"简介"} />
          </Form.Item>
          <Form.Item label="附件上传">
            <TUploadFile FileUrl={FileUrl} setFileUrl={setFileUrl} />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 8, span: 16 }}>
            <Button type="primary" htmlType="submit">
              提交
            </Button>
          </Form.Item>
        </Form>
      </Card>
    </CardCon>
  );
};
