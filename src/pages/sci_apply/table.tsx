import { ApplyProcessModal } from "@/components/modal/applyProcessModal";
import { ProjectApplyModal } from "@/components/modal/projectApplyModal";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import styled from "@emotion/styled";
import { Button, Dropdown, message, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";
import { ProjectType } from "../sci_info/table";
export const SciApplyTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ProjectType | null>(null);
  const http = useHttp();
  const columns: ColumnsType<ProjectType> = [
    {
      title: "项目名称",
      dataIndex: "name",
      key: "name",
      render: (text) => <a>{text}</a>,
      width: 100,
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
      dataIndex: "process",
      render: (_, { process }) => (
        <>
          {
            <Tag
              color={
                process === 0 ? "geekblue" : process === 1 ? "blue" : "green"
              }
            >
              {process === 0
                ? "未申请"
                : process === 1
                ? "正在审核"
                : "审核成功"}
            </Tag>
          }
        </>
      ),
      width: 200,
    },
  ];

  const { data: applyList, run, isLoading } = useAsync<ProjectType[]>();
  useMount(() => {
    run(http("projects"));
  });
  const click = (e: any, info: ProjectType) => {
    setIsModalOpen(true);
    setModalInfo(info);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={
          applyList
            ?.map((item) => ({ ...item, key: item.id }))
            .filter((item) => item.process !== 0) || []
        }
        loading={isLoading}
        onRow={(record) => {
          return {
            onClick: (e) => click(e, record),
          };
        }}
      />
      <ApplyProcessModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={modalInfo}
        setProject={(project) => setModalInfo(project)}
      />
    </>
  );
};
