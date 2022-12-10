import { TUploadFile } from "@/components/upload/TUploadFile";
import { useAuth } from "@/contexts/auth";
import { fileHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Button, Card, Form, Input, message } from "antd";
import { RcFile } from "antd/es/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { CardCon } from ".";

export const Patent = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const onFinish = (values: {
    idNumber: string;
    postcode: string;
    patId: string;
    allpeople: string;
    address: string;
  }) => {
    console.log(values);

    if (fileList.length === 0) {
      message.info("请上传附件");
      return;
    }
    const fd = new FormData();
    fd.append("attached", fileList[0]);
    fd.append("tno", String(user?.id));
    fd.append("idNumber", values.idNumber);
    fd.append("address", values.address);
    fd.append("allPeople", values.allpeople);
    fd.append("patId", values.patId);
    fd.append("postcode", values.postcode);
    fileHttp("demo/teacPatent/submitPatent", {
      body: fd,
    }).then(() => {
      form.setFieldsValue({
        name: "",
        patId: "",
        postcode: "",
        allpeople: "",
        address: "",
        idNumber: "",
      });
      message.success("上传成功");
    });
  };
  return (
    <CardCon>
      <Card style={{ width: "90rem" }}>
        <Form
          form={form}
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 10 }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item label="专利名称" name={"name"}>
            <Input />
          </Form.Item>
          <Form.Item label="身份证号" name={"idNumber"}>
            <Input />
          </Form.Item>
          <Form.Item label="邮政编码" name={"postcode"}>
            <Input />
          </Form.Item>
          <Form.Item label="专利编号" name={"patId"}>
            <Input />
          </Form.Item>
          <Form.Item label="通讯地址" name={"address"}>
            <Input />
          </Form.Item>
          <Form.Item label="发明人" name={"allpeople"}>
            <Input />
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
