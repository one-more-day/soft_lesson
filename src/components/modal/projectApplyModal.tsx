import { User } from "@/pages/login/login.type";
import { ProjectType } from "@/pages/sci_info/table";
import { useHttp } from "@/utils/http";
import styled from "@emotion/styled";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { useState } from "react";
import { TUploadFile } from "../upload/TUploadFile";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  retry: () => void;
}
export const ProjectApplyModal = (props: Iprops) => {
  const http = useHttp();
  const [fileUrl, setFileUrl] = useState("");
  const { project, setIsModalOpen, isModalOpen, retry } = props;
  const onFinish = async (values: User) => {
    setIsModalOpen(false);
    http(`projects/${project?.id}`, {
      method: "PUT",
      data: { ...project, process: 1 },
    }).then(() => retry());
    message.success("申请成功");
  };

  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="申请项目"
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
          <Form.Item name="name" label="项目名称">
            <span>{project?.name}</span>
          </Form.Item>
          <Form.Item name="file" label="文件上传">
            <TUploadFile imageUrl={fileUrl} setImageUrl={setFileUrl}/>
          </Form.Item>
          <Divider />
          <ModalButton>
            <Button type="primary" htmlType="submit">
              申请
            </Button>
          </ModalButton>
        </Form>
      </Modal>
    </>
  );
};
const ModalButton = styled.div`
  display: flex;
  justify-content: center;
`;
