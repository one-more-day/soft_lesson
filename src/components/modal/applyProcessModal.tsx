import { useAuth } from "@/contexts/auth";
import { ApplyProjectType } from "@/types";
import { Button, Modal, Steps, Divider } from "antd";
import { BaseList } from "../list";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ApplyProjectType | null;
  setProject: (project: ApplyProjectType) => void;
}

export const ApplyProcessModal = (props: Iprops) => {
  const { project, setIsModalOpen, isModalOpen, setProject } = props;
  const { user } = useAuth();
  console.log(project);

  const generator = (project: ApplyProjectType) => {
    const arr = [];
    arr.push({ title: "项目名称", name: project.sciInfo.projectname });
    arr.push({ title: "项目申请人", name: user?.username || "jack" });
    arr.push({
      title: "项目附件",
      name: <a href={project.sciInfo.attach}>{project.sciInfo.attach}</a>,
    });
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
        <ApplyStep process={project?.checkStat} />
        <Divider />
        <BaseList
          props={project ? generator(project) : []}
          title={"title"}
          name={"name"}
        />
      </Modal>
    </>
  );
};

const ApplyStep = (props: { process?: number }) => {
  console.log(props);

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
