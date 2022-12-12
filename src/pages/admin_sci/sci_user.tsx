import { AdminAddSciModal } from "@/components/modal/adminAddSciModal";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Input, message, Table } from "antd";
import { useState } from "react";
import { User } from "../login/login.type";
import type { ColumnsType } from "antd/es/table";
import { More } from "@/components/More";
import { ProjectType } from "@/types";
export const SciUser = () => {
  const http = useHttp();
  const { data: sci, run, isLoading, retry } = useAsync<User[]>();
  const [addMoadl, setAddmodal] = useState(false);
  useMount(() => {
    run(http("demo/sciManager/getAllSciManager"), {
      retry: () => http("demo/sciManager/getAllSciManager"),
    });
  });
  const onDelete = (e: any, info: ProjectType | User) => {
    console.log(info);

    http(`demo/sciManager/rmSciManager`, {
      method: "POST",
      data: {
        sno: (info as User).sno,
      },
    }).then((res) => {
      console.log(res);
      retry();
      message.success("删除成功");
    });
  };
  const columns: ColumnsType<User> = [
    {
      title: "用户名",
      dataIndex: "username",
      key: "username",
      render: (_, { username }) => <a>{username}</a>,
      width: 200,
    },
    {
      title: "真实姓名",
      dataIndex: "realname",
      key: "realname",
      width: 200,
    },
    {
      title: "联系电话",
      dataIndex: "telephone",
      key: "telephone",
      width: 200,
    },
    {
      title: "密码",
      dataIndex: "password",
      key: "password",
      width: 300,
      render: (_, { password }) => <Input disabled defaultValue={password} />,
    },
    {
      title: "",
      render: (_, sci) => {
        return <More project={sci} onDelete={onDelete} />;
      },
    },
  ];
  return (
    <>
      <Table
        title={() => (
          <Button onClick={() => setAddmodal(true)}>
            <PlusSquareOutlined />
            新建
          </Button>
        )}
        columns={columns}
        dataSource={sci ? sci.map((item) => ({ ...item, key: item.sno })) : []}
        loading={isLoading}
      />
      <AdminAddSciModal
        retry={retry}
        isModalOpen={addMoadl}
        setIsModalOpen={setAddmodal}
      />
    </>
  );
};
