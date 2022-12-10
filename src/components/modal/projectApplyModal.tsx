import { useAuth } from "@/contexts/auth";
import { User } from "@/pages/login/login.type";
import { ProjectType } from "@/types";
import { fileHttp, useHttp } from "@/utils/http";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { useState } from "react";
import { ModalButton } from "../lib";
import { TUploadFile } from "../upload/TUploadFile";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
  retry: () => void;
}
export const ProjectApplyModal = (props: Iprops) => {
  const { user } = useAuth();
  const [fileList, setFileList] = useState<RcFile[]>([]);
  const { project, setIsModalOpen, isModalOpen, retry } = props;
  const onFinish = async () => {
    if (fileList.length === 0) {
      message.info("请上传附件");
      return;
    }
    setIsModalOpen(false);
    const fd = new FormData();
    fd.append("attach", fileList[0]);
    fd.append("sciNo", project ? project.sciNo.toString() : "");
    fd.append("tno", user ? user.id.toString() : "");
    fileHttp(`demo/projectApply/teacApply`, {
      body: fd,
    }).then((res) => {
      console.log(res);
      retry();
      message.success("申请成功");
    });
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
            <span>{project?.projectname}</span>
          </Form.Item>
          <Form.Item name="people" label="项目申请人">
            <span>{user?.name}</span>
          </Form.Item>
          <Form.Item name="file" label="文件上传">
            <TUploadFile setFileList={setFileList} />
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
