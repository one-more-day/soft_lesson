import { SearchPanle } from "@/components/search";
import { useAuth } from "@/contexts/auth";
import { TeacAward, TeacPaper, TeacPatent, TeacSoft } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { LinkOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Form, Input, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
interface DataType {
  key: React.Key;
  name: string;
  attach: string;
  type: number;
  checkStat: number;
}

export const SciAwardTable = () => {
  const typeMap = new Map();
  typeMap.set("专利", 1);
  typeMap.set("软著", 2);
  typeMap.set("论文", 3);
  const statMap = new Map();
  statMap.set("正在审核", 1);
  statMap.set("审核失败", 2);
  statMap.set("审核成功", 3);
  const http = useHttp();
  const { user } = useAuth();
  const initData = useRef<DataType[]>([]);
  const [allTabData, setAllTabData] = useState<DataType[]>([]);
  useMount(() => {
    http("demo/teacher/getTeacAward", {
      method: "GET",
      data: {
        tno: user?.tno,
      },
    }).then((res) => {
      const award: DataType[] = [];
      res.teacPatents.map((item: TeacPatent) => {
        award.push({
          key: "pat" + item.patId,
          name: item.name,
          attach: item.attached,
          type: 1,
          checkStat: item.checkStat,
        });
      });
      res.teacSofts.map((item: TeacSoft) => {
        award.push({
          key: "soft" + item.patId,
          name: item.name,
          attach: item.softMaterial,
          type: 2,
          checkStat: item.checkStat,
        });
      });
      res.teacPapers.map((item: TeacPaper) => {
        award.push({
          key: "paper" + item.patId,
          name: item.name,
          attach: item.thesis,
          type: 3,
          checkStat: item.checkStat,
        });
      });
      initData.current = award;
      setAllTabData(award);
    });
  });
  const columns: ColumnsType<DataType> = [
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
            item.type.toString().includes(typeMap.get(param)) ||
            item.checkStat.toString().includes(statMap.get(param))
        )
      );
    }
  };
  return (
    <Table
      title={() => (
        <>
          <SearchPanle onEnter={onEnter} />
        </>
      )}
      columns={columns}
      dataSource={allTabData}
      pagination={{ defaultPageSize: 7 }}
    />
  );
};
