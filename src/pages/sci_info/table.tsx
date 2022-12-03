import { ProjectApplyModal } from "@/components/modal/projectApplyModal";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { DownOutlined, LinkOutlined, UserOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, message, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

export interface ProjectType {
  id: string;
  name: string;
  intro: string;
  endtime: string;
  process: number;
  attachment: string;
}

export const SciInfoTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ProjectType | null>(null);
  const http = useHttp();
  const { data: applyList, run, isLoading, retry } = useAsync<ProjectType[]>();
  useMount(() => {
    run(http("projects"), { retry: () => http("projects") });
    console.log(applyList);
  });
  const apply = (e: any, info: ProjectType) => {
    if (info.process !== 0) {
      message.info("已申请");
    } else {
      setModalInfo(info);
      setIsModalOpen(true);
    }
  };
  const reset = (e: any, info: ProjectType) => {
    if (info.process === 0) {
      message.info("未申请");
    } else {
      http(`projects/${info.id}`, {
        method: "PUT",
        data: { ...info, process: 0 },
      }).then(() => retry());
      message.success("撤销成功");
    }
  };
  const columns: ColumnsType<ProjectType> = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 300,
    },
    {
      title: "项目简介",
      dataIndex: "intro",
      key: "intro",
      width: 200,
    },
    {
      title: "截至时间",
      dataIndex: "endtime",
      width: 200,
    },
    {
      title: "进度",
      key: "process",
      dataIndex: "process",
      render: (_, { process }) => (
        <>
          {
            <Tag color={process === 0 ? "geekblue" : "green"}>
              {process === 0 ? "未申请" : "已申请"}
            </Tag>
          }
        </>
      ),
    },
    {
      title: "附件下载",
      dataIndex: "attachment",
      render: (text) => (
        <AttachLink href={text}>
          <LinkOutlined />
          附件
        </AttachLink>
      ),
    },
    {
      title: "",
      render: (_, project) => {
        return <More apply={apply} reset={reset} project={project} />;
      },
    },
  ];

  return (
    <>
      <Table
        columns={columns}
        dataSource={applyList?.map((item) => ({ ...item, key: item.id })) || []}
        loading={isLoading}
      />
      <ProjectApplyModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={modalInfo}
        setProject={(project) => setModalInfo(project)}
        retry={retry}
      />
    </>
  );
};
const AttachLink = styled.a`
  font-size: 1.3rem;
`;
const More = ({
  project,
  apply,
  reset,
}: {
  project: ProjectType;
  apply: (e: any, project: ProjectType) => void;
  reset: (e: any, project: ProjectType) => void;
}) => {
  const items = [
    {
      label: (
        <Button
          style={{ fontSize: "1.4rem" }}
          type="link"
          onClick={(e) => apply(e, project)}
        >
          申请
        </Button>
      ),
      key: "1",
    },
    {
      label: (
        <Button
          style={{ fontSize: "1.4rem" }}
          type="link"
          onClick={(e) => reset(e, project)}
        >
          撤销
        </Button>
      ),
      key: "2",
    },
  ];
  return (
    <Dropdown menu={{ items }}>
      <Button type="text">
        <Space>...</Space>
      </Button>
    </Dropdown>
  );
};
