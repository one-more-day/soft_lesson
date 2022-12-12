import { useAuth } from "@/contexts/auth";
import { ProjectType } from "@/types";
import { getNowTime } from "@/utils";
import { fileHttp, useHttp } from "@/utils/http";
import { Button, Divider, Form, Input, message, Modal, Select } from "antd";
import { RcFile } from "antd/es/upload/interface";
import { useState } from "react";
import { ModalButton } from "../lib";
import { TUploadFile } from "../upload/TUploadFile";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  retry: () => void;
}
export const ProjectAddModal = (props: Iprops) => {
  const { user } = useAuth();
  const { setIsModalOpen, isModalOpen, retry } = props;
  const [FileUrl, setFileUrl] = useState("");
  const [fileList, setFileList] = useState<RcFile[]>([]);

  const onFinish = async (values: ProjectType) => {
    if (fileList.length === 0) {
      message.info("请上传附件");
      return;
    }
    const fd = new FormData();
    fd.append("procjectName", values.projectname);
    fd.append("deadLine", values.deadline);
    fd.append("attach", fileList[0]);
    fd.append("publishTime", getNowTime("YYYY-MM-DD"));
    fd.append("publisher", user ? user.name : "");

    console.log(values, FileUrl);
    fileHttp("demo/sciInfo/addSciInfo", {
      body: fd,
    }).then(async (res) => {
      const text = await res.text();
      message.info(text);
      retry();
    });
    setIsModalOpen(false);
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
          <Form.Item
            rules={[{ required: true, message: "项目名称不能为空" }]}
            name="projectname"
            label="项目名称"
          >
            <Input />
          </Form.Item>
          <Form.Item
            rules={[{ required: true, message: "截止时间不能为空" }]}
            name="deadline"
            label="截止时间"
          >
            <Input />
          </Form.Item>
          <Form.Item rules={[{ required: false }]} label="附件上传">
            <TUploadFile
              FileUrl={FileUrl}
              setFileUrl={setFileUrl}
              setFileList={setFileList}
            />
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
