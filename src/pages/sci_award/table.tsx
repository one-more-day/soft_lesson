import { TeacAward, TeacPaper, TeacPatent, TeacSoft } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { LinkOutlined } from "@ant-design/icons";
import styled from "@emotion/styled";
import { Form, Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { useRef, useState } from "react";
interface DataType {
  key: React.Key;
  name: string;
  attach: string;
  type: number;
}

export const SciAwardTable = () => {
  const http = useHttp();
  const initData = useRef<DataType[]>([]);
  const [allTabData, setAllTabData] = useState<DataType[]>([]);
  useMount(() => {
    http("demo/teacher/getTeacAward", {
      method: "GET",
      data: {
        tno: 1,
      },
    }).then((res) => {
      const award: DataType[] = [];
      res.teacPatents.map((item: TeacPatent) => {
        award.push({
          key: "pat" + item.patId,
          name: item.name,
          attach: item.attached,
          type: 1,
        });
      });
      res.teacSofts.map((item: TeacSoft) => {
        award.push({
          key: "soft" + item.patId,
          name: item.name,
          attach: item.softMaterial,
          type: 2,
        });
      });
      res.teacPapers.map((item: TeacPaper) => {
        award.push({
          key: "paper" + item.patId,
          name: item.name,
          attach: item.thesis,
          type: 3,
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
        initData.current.filter((item) => item.name.includes(param))
      );
    }
  };
  return (
    <Table
      title={() => (
        <>
          <SearchCon>
            <div style={{ width: 50, height: 30, paddingTop: 3 }}>
              <span>搜索:</span>
            </div>
            <InputCon>
              <Input placeholder="按回车搜索奖项名称" onPressEnter={onEnter} />
            </InputCon>
            <div style={{ height: 30, paddingTop: 3, marginLeft: 10 }}>
              <span style={{ fontSize: 13 }}>(ps:输入空串搜索所有)</span>
            </div>
          </SearchCon>
        </>
      )}
      columns={columns}
      dataSource={allTabData}
      pagination={{ defaultPageSize: 7 }}
    />
  );
};
const SearchCon = styled.div`
  display: flex;
  height: 30px;
  width: 60rem;
`;
const InputCon = styled.div`
  width: 25rem;
  margin-left: 0.5rem;
`;
