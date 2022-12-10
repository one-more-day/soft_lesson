import { User } from "@/pages/login/login.type";
import { ApplyProjectType } from "@/types";
import { useHttp } from "@/utils/http";
import { Button, Modal, Steps, Divider, StepsProps, Form, Input } from "antd";
import TextArea from "antd/lib/input/TextArea";
import { useEffect, useState } from "react";
import { MoButton, ModalButton } from "../lib";
import { BaseList } from "../list";
interface Iprops {
  retry: () => void;
  applyUser?: User;
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ApplyProjectType | null;
  setProject: (project: ApplyProjectType) => void;
}

export const ExamProcessModal = (props: Iprops) => {
  const { applyUser, project, setIsModalOpen, isModalOpen, setProject, retry } =
    props;
  const generator = (project: ApplyProjectType) => {
    const arr = [];
    arr.push({ title: "项目名称", name: project.sciInfo.projectname });
    arr.push({
      title: "项目申请人",
      name: applyUser ? applyUser.name : "jack",
    });
    arr.push({
      title: "项目附件",
      name: <a href={project.sciInfo.attach}>{project.sciInfo.attach}</a>,
    });
    return arr;
  };

  const [current, setCurrent] = useState(0);
  const [status, setStatus] = useState<StepsProps["status"]>("process");
  const http = useHttp();
  useEffect(() => {
    if (project?.checkStat === 2) {
      setCurrent(1);
      setStatus("error");
      return;
    }
    setCurrent(project ? project.checkStat : 0);
    setStatus("process");
  }, [props]);
  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="申请流程"
        open={isModalOpen}
        width={800}
        footer={null}
      >
        <ApplyStep current={current || 0} status={status} />
        <Divider />
        <BaseList
          props={project ? generator(project) : []}
          title={"title"}
          name={"name"}
        />
        <Form.Item label={"项目评价"}>
          <TextArea defaultValue={project?.intro} />
        </Form.Item>
        <Divider />
        <ModalButton>
          <MoButton
            type="primary"
            onClick={() => {
              http("demo/projectApply/upState", {
                method: "POST",
                data: {
                  sciNo: project?.sciNo,
                  tno: project?.tno,
                  checkStat: 3,
                },
              }).then(() => retry());
              setCurrent(3);
              setIsModalOpen(false);
            }}
          >
            同意
          </MoButton>
          <MoButton
            onClick={() => {
              http("demo/projectApply/upState", {
                method: "POST",
                data: {
                  sciNo: project?.sciNo,
                  tno: project?.tno,
                  checkStat: 2,
                },
              }).then(() => retry());
              setCurrent(1);
              setStatus("error");
              setIsModalOpen(false);
            }}
          >
            拒绝
          </MoButton>
          <MoButton
            onClick={() => {
              http("demo/projectApply/upState", {
                method: "POST",
                data: {
                  sciNo: project?.sciNo,
                  tno: project?.tno,
                  checkStat:1,
                },
              }).then(() => retry());
              setCurrent(1);
              setStatus("process");
              setIsModalOpen(false);
            }}
          >
            置为审核状态
          </MoButton>
        </ModalButton>
      </Modal>
    </>
  );
};

const ApplyStep = ({
  current,
  status,
}: {
  current: number;
  status: StepsProps["status"];
}) => {
  return (
    <>
      <Steps
        size="small"
        status={status}
        current={current}
        items={[
          {
            title: "已申请",
          },
          {
            title: "审核",
          },
          {
            title: "审核成功",
          },
        ]}
      />
    </>
  );
};
