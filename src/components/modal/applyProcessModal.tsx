import { ProjectType } from "@/pages/sci_info/table";
import { Button, Modal, Steps,Divider } from "antd";
import { BaseList } from "../list";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
}

export const ApplyProcessModal = (props: Iprops) => {
  const { project, setIsModalOpen, isModalOpen, setProject } = props;
  const generator = (project: ProjectType) => {
    const arr = [];
    arr.push({ title: "项目名称", name: project.name });
    arr.push({ title: "项目申请人", name: project.name });
    arr.push({ title: "项目附件", name: project.name });
    arr.push({ title: "项目审核评价", name: project.intro });    
    return arr;
  };
  return (
    <>
      <Modal
        onCancel={() => setIsModalOpen(false)}
        title="申请流程"
        open={isModalOpen}
        width={800}
        footer={null}
      >
        <ApplyStep process={project?.process} />
        <Divider />
        <BaseList props={project ? generator(project) : []} />
      </Modal>
    </>
  );
};

const ApplyStep = (props: { process?: number }) => {
  return (
    <>
      <Steps
        size="small"
        current={props.process}
        items={[
          {
            title: "已申请",
          },
          {
            title: "正在审核",
          },
          {
            title: "审核成功",
          },
        ]}
      />
    </>
  );
};
