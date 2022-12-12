import { ApplyProcessModal } from "@/components/modal/applyProcessModal";
import { ApplyProjectType, ProjectType } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useState } from "react";


export const SciApplyTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ApplyProjectType | null>(null);
  const http = useHttp();
  const columns: ColumnsType<ApplyProjectType> = [
    {
      title: "项目名称",
      dataIndex: "projectname",
      key: "projectname",
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
      dataIndex: "deadline",
      width: 200,
    },
    {
      title: "进度",
      render: (_, { checkStat }) => (
        <>
          {
            <Tag
            color={
              checkStat === 0
                ? "geekblue"
                : checkStat === 1
                ? "blue"
                : checkStat === 2
                ? "red"
                : "green"
            }
            >
              {checkStat === 0
                ? "未申请"
                : checkStat === 1
                ? "正在审核"
                : checkStat === 2
                ? "审核失败"
                : "审核成功"}
            </Tag>
          }
        </>
      ),
      width: 200,
    },
  ];

  const { data: applyList, run, isLoading } = useAsync<ApplyProjectType[]>();
  useMount(() => {
    run(http("demo/projectApply/getProjectApplyByTno", { data: { tno: 1 } }));
  });
  const click = (e: any, info: ApplyProjectType) => {
    setIsModalOpen(true);
    setModalInfo(info);
  };
  return (
    <>
      <Table
        columns={columns}
        dataSource={
          applyList?.map((item) => ({
            ...item,
            key: item.sciNo,
            ...item.sciInfo,
          })) || []
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
