import { AdminAddTeacherModal } from "@/components/modal/adminAddTeaModal";
import { More } from "@/components/More";
import { ProjectType } from "@/types";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { PlusSquareOutlined } from "@ant-design/icons";
import { Button, Input, message, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import Item from "antd/lib/list/Item";
import { useState } from "react";
import { User } from "../login/login.type";

export const TeacUser = () => {
  const http = useHttp();
  const [addMoadl, setAddmodal] = useState(false);
  const { data: teac, run, isLoading, retry } = useAsync<User[]>();
  const onDelete = (e: any, info: ProjectType | User) => {
    console.log(info);

    http(`demo/teacher/rmTeacher`, {
      method: "POST",
      data: {
        tno: (info as User).tno,
      },
    }).then((res) => {
      console.log(res);
      retry();
      message.success("删除成功");
    });
  };
  useMount(() => {
    run(http("demo/teacher/getAllteacher"), {
      retry: () => http("demo/teacher/getAllteacher"),
    });
  });
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
      render: (_, teac) => {
        return <More project={teac} onDelete={onDelete} />;
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
        dataSource={
          teac ? teac.map((item) => ({ ...item, key: item.tno })) : []
        }
        loading={isLoading}
      />
      <AdminAddTeacherModal
        isModalOpen={addMoadl}
        setIsModalOpen={setAddmodal}
        retry={retry}
      />
    </>
  );
};
