import { ProjectAddModal } from "@/components/modal/projectAddModal";
import { ProjectType } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import {
  DownOutlined,
  LinkOutlined,
  PlusSquareOutlined,
  UserOutlined,
} from "@ant-design/icons";
import styled from "@emotion/styled";
import { Button, Dropdown, message, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";

export const SciPublishTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const http = useHttp();
  const { data: applyList, run, isLoading, retry } = useAsync<ProjectType[]>();
  useMount(() => {
    run(http("demo/sciInfo/getAllSciInfo"), {
      retry: () => http("demo/sciInfo/getAllSciInfo"),
    });
    console.log(applyList);
  });
  const onDelete = (e: any, info: ProjectType) => {
    console.log(info);

    http(`demo/sciInfo/rmSciInfo`, {
      method: "POST",
      data: {
        sciNo: info.sciNo,
      },
    }).then((res) => {
      console.log(res);
      message.success("删除成功");
      retry();
    });
  };
  const columns: ColumnsType<ProjectType> = [
    {
      title: "项目名称",
      dataIndex: "projectname",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 300,
    },
    {
      title: "项目简介",
      dataIndex: "id",
      key: "intro",
      width: 200,
    },
    {
      title: "截至时间",
      dataIndex: "deadline",
      width: 200,
    },
    {
      title: "附件",
      dataIndex: "attach",
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
        return <More project={project} onDelete={onDelete} />;
      },
    },
  ];

  return (
    <>
      <Table
        title={() => (
          <Button onClick={() => setIsModalOpen(true)}>
            <PlusSquareOutlined />
            新建
          </Button>
        )}
        columns={columns}
        dataSource={
          applyList?.map((item) => ({ ...item, key: item.sciNo })) || []
        }
        loading={isLoading}
      />
      <ProjectAddModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
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
  onDelete,
}: {
  project: ProjectType;
  onDelete: (e: any, project: ProjectType) => void;
}) => {
  const items = [
    {
      label: (
        <Button
          style={{ fontSize: "1.4rem" }}
          type="link"
          onClick={(e) => onDelete(e, project)}
        >
          删除
        </Button>
      ),
      key: "1",
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
