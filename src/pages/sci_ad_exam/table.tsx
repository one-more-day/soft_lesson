import { ExamProcessModal } from "@/components/modal/examProcessModal";
import { SearchPanle } from "@/components/search";
import { ApplyProjectType, ProjectType } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useEffect, useRef, useState } from "react";
import { User } from "../login/login.type";
export interface ExamDataType {
  sciNo: number;
  tno: number;
  key: React.Key;
  projectname: string;
  checkStat: number;
  teacher: string;
  attach: string;
  deadline: string;
}
export const SciExamTable = () => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<ExamDataType | null>(null);
  const initData = useRef<ExamDataType[]>([]);
  const applyUser = useRef<Map<number, User>>(new Map());
  const applyProject = useRef<Map<number, ProjectType>>(new Map());
  const [allTabData, setAllTabData] = useState<ExamDataType[]>([]);
  const http = useHttp();
  const getAllTeacher = async () => {
    const user = await http("demo/teacher/getAllteacher");
    user.map((item: User) => {
      applyUser.current.set(Number(item.tno), item);
    });
  };
  const getAllProject = async () => {
    const pro = await http("demo/sciInfo/getAllSciInfo");
    pro.map((item: ProjectType) => {
      applyProject.current.set(Number(item.sciNo), item);
    });
  };
  const columns: ColumnsType<ExamDataType> = [
    {
      title: "项目名称",
      dataIndex: "projectname",
      render: (text) => <a>{text}</a>,
      width: 100,
    },
    {
      title: "项目简介",
      dataIndex: "key",
      key: "id",
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
    {
      title: "申请人",
      dataIndex: "teacher",
      width: 200,
    },
  ];

  const fun = () => {
    getAllTeacher().then(() => {
      getAllProject().then(() => {
        http("demo/projectApply/getAllProjectApply").then(
          async (res: ApplyProjectType[]) => {
            const apply: ExamDataType[] = [];
            res.map((item) => {
              apply.push({
                sciNo: item.sciNo,
                tno: item.tno,
                key: item.id,
                projectname: applyProject.current.get(item.sciNo)?.projectname!,
                checkStat: item.checkStat,
                teacher: applyUser.current.get(item.tno)?.username!,
                attach: item.attach,
                deadline: applyProject.current.get(item.sciNo)?.deadline!,
              });
            });
            initData.current = apply;
            setAllTabData(apply);
          }
        );
      });
    });
  };
  useMount(() => {
    fun();
  });
  const click = (e: any, info: ExamDataType) => {
    setIsModalOpen(true);
    setModalInfo(info);
  };
  const onEnter = (e: any) => {
    const statMap = new Map();
    statMap.set("正在审核", 1);
    statMap.set("审核失败", 2);
    statMap.set("审核成功", 3);
    const param = e.target.value.trim();
    console.log(e.target.value.trim());
    if (param === "") {
      setAllTabData(initData.current);
    } else {
      setAllTabData(
        initData.current.filter(
          (item) =>
            item.projectname.includes(param) ||
            item.teacher.toString().includes(param) ||
            item.checkStat.toString().includes(statMap.get(param))
        )
      );
    }
  };
  return (
    <>
      <Table
        title={() => (
          <>
            <SearchPanle onEnter={onEnter} />
          </>
        )}
        columns={columns}
        dataSource={allTabData}
        onRow={(record) => {
          return {
            onClick: (e) => click(e, record),
          };
        }}
      />
      <ExamProcessModal
        applyUser={applyUser.current}
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={modalInfo}
        setProject={(project) => setModalInfo(project)}
        retry={() => fun()}
      />
    </>
  );
};
