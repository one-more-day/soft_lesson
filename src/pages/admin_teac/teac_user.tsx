import { useAuth } from "@/contexts/auth";
import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../login/login.type";
export const columns: ColumnsType<User> = [
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
];
export const TeacUser = () => {
  const http = useHttp();
  const { user } = useAuth();
  const { data: teac, run, isLoading } = useAsync<User>();
  useMount(() => {
    run(http("demo/teacher/getTeacherByTno", { data: { tno: 1 } }));
  });
  return (
    <Table
      columns={columns}
      dataSource={teac ? [teac] : []}
      loading={isLoading}
    />
  );
};
