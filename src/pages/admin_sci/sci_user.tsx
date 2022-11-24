import { useMount } from "@/utils";
import { useHttp } from "@/utils/http";
import { useAsync } from "@/utils/useAsync";
import { Table } from "antd";
import { columns } from "../admin_teac/teac_user";
import { User } from "../login/login.type";

export const SciUser = () => {
  const http = useHttp();
  const { data: teac, run, isLoading } = useAsync<User[]>();
  useMount(() => {
    run(http("users", { data: { auth: 2 } }));
  });
  return (
    <Table columns={columns} dataSource={teac || []} loading={isLoading} />
  );
};
