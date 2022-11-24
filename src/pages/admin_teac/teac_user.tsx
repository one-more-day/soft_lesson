import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { Input, Table } from "antd";
import type { ColumnsType } from "antd/es/table";
import { User } from "../login/login.type";
export const columns: ColumnsType<User> = [
  {
    title: "用户名",
    dataIndex: "name",
    key: "name",
    render: (text) => <a>{text}</a>,
    width: 200,
  },
  {
    title: "真实姓名",
    dataIndex: "realName",
    key: "realName",
    width: 200,
  },
  {
    title: "联系电话",
    dataIndex: "tele",
    key: "tele",
    width: 200,
  },
  {
    title: "邮箱",
    dataIndex: "email",
    key: "email",
    width: 200,
  },
  {
    title: "密码",
    dataIndex: "password",
    render: (text) => <Input disabled defaultValue={text} />,
  },
];
export const TeacUser = () => {
  const http = useHttp();
  const { data: teac, run, isLoading } = useAsync<User[]>();
  useMount(() => {
    run(http("users", { data: { auth: 1 } }));
  });
  return (
    <Table columns={columns} dataSource={teac || []} loading={isLoading} />
  );
};
