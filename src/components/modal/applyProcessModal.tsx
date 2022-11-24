import { ProjectType } from "@/pages/sci_info/table";
import { Button, Modal, Steps } from "antd";
interface Iprops {
  isModalOpen: boolean;
  setIsModalOpen: (p: boolean) => void;
  project: ProjectType | null;
  setProject: (project: ProjectType) => void;
}
export const ApplyProcessModal = (props: Iprops) => {
  const { project, setIsModalOpen, isModalOpen, setProject } = props;
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
