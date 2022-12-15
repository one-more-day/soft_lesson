import { TUploadFile } from "@/components/upload/TUploadFile";
import { useAuth } from "@/contexts/auth";
import { fileHttp } from "@/utils/http";
import { Button, Card, Form, Input, message } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { useState } from "react";
import { CardCon } from ".";

export const Patent = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const onFinish = (values: {
    idNumber: string;
    postcode: string;
    name: string;
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
    fd.append("tno", String(user?.tno));
    fd.append("idNumber", values.idNumber);
    fd.append("address", values.address);
    fd.append("allPeople", values.allpeople);
    fd.append("name", values.name);
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
      setFileList([]);
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
          <Form.Item
            label="专利名称"
            name={"name"}
            rules={[{ required: true, message: "专利名称不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="身份证号"
            name={"idNumber"}
            rules={[
              { required: true, message: "身份证号不能为空" },
              {
                required: false,
                pattern: new RegExp(
                  /^[1-9]\d{5}(18|19|20)\d{2}((0[1-9])|(10|11|12))(([0-2][1-9])|10|20|30|31)\d{3}[0-9Xx]$/,
                  "g"
                ),
                message: "请输入正确的身份证",
              },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="邮政编码"
            name={"postcode"}
            rules={[{ required: true, message: "邮政编码不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="通讯地址"
            name={"address"}
            rules={[{ required: true, message: "通讯地址不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            label="发明人"
            name={"allpeople"}
            rules={[{ required: true, message: "发明人不能为空" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item label="附件上传">
            <TUploadFile FileList={fileList} setFileList={setFileList} />
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
