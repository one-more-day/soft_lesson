import { ProjectType } from "@/pages/sci_info/table";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { TUploadFile } from "../upload/TUploadFile";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  retry: () => void;
}
export const ProjectAddModal = (props: Iprops) => {
  const http = useHttp();
  const { setIsModalOpen, isModalOpen, retry } = props;
  const [FileUrl, setFileUrl] = useState("");
  const onFinish = async (values: ProjectType) => {
    setIsModalOpen(false);
    console.log(values, FileUrl);
    http(`projects`, {
      method: "POST",
      data: { ...values, attachment: FileUrl, process: 0 },
    }).then(() => retry());
    message.success("添加成功");
  };

  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="添加项目"
        open={isModalOpen}
        width={600}
        footer={null}
      >
        <Form
          labelCol={{ span: 4 }}
          wrapperCol={{ span: 14 }}
          layout="horizontal"
          onFinish={onFinish}
        >
          <Form.Item rules={[{ required: true }]} name="name" label="项目名称">
            <Input />
          </Form.Item>
          <Form.Item rules={[{ required: true }]} name="intro" label="项目简介">
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true }]}
            name="endtime"
            label="截止时间"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: false }]}
            name="attachment"
            label="附件上传"
          >
            <TUploadFile FileUrl={FileUrl} setFileUrl={setFileUrl} />
          </Form.Item>
          <Divider />
          <Form.Item>
            <ModalButton>
              <Button
                type="primary"
                style={{ marginRight: "2rem" }}
                htmlType="submit"
              >
                确定
              </Button>
              <Button
                style={{ marginRight: "2rem" }}
                onClick={() => setIsModalOpen(false)}
              >
                取消
              </Button>
            </ModalButton>
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};
const ModalButton = styled.div`
  display: flex;
  justify-content: center;
`;
