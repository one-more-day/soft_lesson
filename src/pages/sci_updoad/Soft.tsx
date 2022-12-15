import { TUploadFile } from "@/components/upload/TUploadFile";
import { useAuth } from "@/contexts/auth";
import { fileHttp } from "@/utils/http";
import { Button, Card, Form, Input, message } from "antd";
import { RcFile } from "antd/es/upload/interface";
import TextArea from "antd/lib/input/TextArea";
import { useState } from "react";
import { CardCon } from ".";

export const Soft = () => {
  const { user } = useAuth();
  const [form] = Form.useForm();
  const [fileList1, setFileList1] = useState<RcFile[]>([]);
  const [fileList2, setFileList2] = useState<RcFile[]>([]);
  const [fileList3, setFileList3] = useState<RcFile[]>([]);
  const onFinish = (values: {
    idNumber: string;
    postcode: string;
    name: string;
    allpeople: string;
    address: string;
  }) => {
    console.log(values);
    if (
      fileList1.length === 0 ||
      fileList2.length === 0 ||
      fileList3.length === 0
    )
      message.info("请上传附件");
    const fd = new FormData();
    fd.append("softApply", fileList1[0]);
    fd.append("softMaterial", fileList2[0]);
    fd.append("idAuth", fileList3[0]);
    fd.append("tno", String(user?.tno));
    fd.append("idNumber", values.idNumber);
    fd.append("name", values.name);
    fileHttp("demo/teacSoft/submitSoft", {
      body: fd,
    }).then(() => {
      form.setFieldsValue({
        name: "",
        idNumber: "",
      });
      message.success("上传成功");
      setFileList1([]);
      setFileList2([]);
      setFileList3([]);
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
            label="软著名称"
            name={"name"}
            rules={[{ required: true, message: "软著名称不能为空" }]}
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
          <Form.Item label="软件申请表">
            <TUploadFile FileList={fileList1} setFileList={setFileList1} />
          </Form.Item>
          <Form.Item label="软件材料">
            <TUploadFile FileList={fileList2} setFileList={setFileList2} />
          </Form.Item>
          <Form.Item label="联系人证明文件">
            <TUploadFile FileList={fileList3} setFileList={setFileList3} />
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
