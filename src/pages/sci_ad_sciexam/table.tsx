import { ExamAwardModal } from "@/components/modal/examAwardModal";
import { SearchPanle } from "@/components/search";
import { TeacAward, TeacPaper, TeacPatent, TeacSoft } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { LinkOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Form, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
import { User } from "../login/login.type";
export interface AwardDataType {
  key: React.Key;
  name: string;
  attach: string;
  type: number;
  checkStat: number;
  teacher: string;
  tno: number;
  patId: number;
}

export const SciAwardExamTable = () => {
  const http = useHttp();
  const initData = useRef<AwardDataType[]>([]);
  const applyUser = useRef<Map<number, User>>(new Map());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [modalInfo, setModalInfo] = useState<AwardDataType | null>(null);
  const [allTabData, setAllTabData] = useState<AwardDataType[]>([]);
  const getAllTeacher = async () => {
    const user = await http("demo/teacher/getAllteacher");
    user.map((item: User) => {
      applyUser.current.set(Number(item.tno), item);
    });
  };
  const fun = () => {
    getAllTeacher().then(() => {
      http("demo/teacher/getAllTeacAward").then((res) => {
        const award: AwardDataType[] = [];
        res.data.teacPatents.map((item: TeacPatent) => {
          award.push({
            patId: item.patId,
            key: "pat" + item.patId,
            name: item.name,
            attach: item.attached,
            type: 1,
            checkStat: item.checkStat,
            tno: item.tno,
            teacher: applyUser.current.get(item.tno)?.username!,
          });
        });
        res.data.teacSofts.map((item: TeacSoft) => {
          award.push({
            patId: item.patId,
            key: "soft" + item.patId,
            name: item.name,
            attach: item.softMaterial,
            type: 2,
            checkStat: item.checkStat,
            tno: item.tno,
            teacher: applyUser.current.get(item.tno)?.username!,
          });
        });
        res.data.teacPapers.map((item: TeacPaper) => {
          award.push({
            patId: item.patId,
            key: "paper" + item.patId,
            name: item.name,
            attach: item.thesis,
            type: 3,
            checkStat: item.checkStat,
            tno: item.tno,
            teacher: applyUser.current.get(item.tno)?.username!,
          });
        });
        initData.current = award;
        console.log(award);

        setAllTabData(award);
      });
    });
  };
  const statMap = new Map();
  statMap.set("正在审核", 1);
  statMap.set("审核失败", 2);
  statMap.set("审核成功", 3);
  useMount(() => {
    fun();
  });
  const columns: ColumnsType<AwardDataType> = [
    {
      title: "名称",
      dataIndex: "name",
    },
    {
      title: "类型",
      dataIndex: "type",
      render: (_, { type }) => {
        return type === 1 ? (
          <a>专利</a>
        ) : type === 2 ? (
          <a>软著</a>
        ) : (
          <a>论文</a>
        );
      },
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
      title: "附件",
      dataIndex: "attach",
      render: (_, { attach }) => {
        return (
          <a href={attach}>
            <LinkOutlined />
            <span style={{ marginLeft: 3 }}>{attach.split("file/")[1]}</span>
          </a>
        );
      },
    },
    {
      title: "申请人",
      dataIndex: "teacher",
    },
  ];
  const onEnter = (e: any) => {
    const param = e.target.value.trim();
    console.log(e.target.value.trim());
    if (param === "") {
      setAllTabData(initData.current);
    } else {
      setAllTabData(
        initData.current.filter(
          (item) =>
            item.name.includes(param) ||
            item.teacher.includes(param) ||
            item.checkStat.toString().includes(statMap.get(param))
        )
      );
    }
  };
  const click = (e: any, info: AwardDataType) => {
    setIsModalOpen(true);
    setModalInfo(info);
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
        pagination={{ defaultPageSize: 7 }}
        onRow={(record) => {
          return {
            onClick: (e) => click(e, record),
          };
        }}
      />
      <ExamAwardModal
        isModalOpen={isModalOpen}
        setIsModalOpen={setIsModalOpen}
        project={modalInfo}
        setProject={(project) => setModalInfo(project)}
        retry={() => fun()}
      />
    </>
  );
};
