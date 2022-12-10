import { TUploadFile } from "@/components/upload/TUploadFile";
import styled from "@emotion/styled";
import type { RcFile } from "antd/es/upload/interface";
import { Button, Card, Form, Input, message } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { CardCon } from ".";
import { useAuth } from "@/contexts/auth";
import { fileHttp } from "@/utils/http";

export const Paper = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const onFinish = (values: { title: string; patId: string }) => {
    if (fileList.length === 0) {
      message.info("请上传附件");
      return;
    }
    const fd = new FormData();
    fd.append("thesis", fileList[0]);
    fd.append("tno", String(user?.id));
    fd.append("subject", values.title);
    fd.append("patId", values.patId);
    fileHttp("demo/teacPaper/submitPaper", {
      body: fd,
    }).then(() => {
      form.setFieldsValue({
        patId: "",
        subject: "",
        title: "",
      });
      message.success("上传成功");
    });
  };
  return (
    <CardCon>
      <Card style={{ width: "90rem" }}>
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
          form={form}
        >
          <Form.Item label="论文题目" name="title">
            <Input />
          </Form.Item>
          <Form.Item label="论文编号" name="patId">
            <Input />
          </Form.Item>
          <Form.Item label="论文简介" name={"subject"}>
            <TextArea rows={2} placeholder={"简介"} />
          </Form.Item>
          <Form.Item label="申请人" name={"tno"}>
            <Input defaultValue={user?.name} disabled />
          </Form.Item>
          <Form.Item label="附件上传">
            <TUploadFile setFileList={setFileList} />
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
