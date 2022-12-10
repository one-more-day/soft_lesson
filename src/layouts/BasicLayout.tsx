import { PageHeader } from "@/components/header";
import { Layout } from "antd";
import styled from "@emotion/styled";
import { Outlet } from "react-router";
import { MenuSider } from "@/components/sider";
export const BasicLayout = () => {
  return (
    <div>
      <PageHeader />
      <Layout>
        <MenuSider />
        <Layout>
          <Center>
            <Outlet />
          </Center>
        </Layout>
      </Layout>
    </div>
  );
};
const Center = styled.div`
  min-height: calc(100vh - 6.4rem);
  background-color: #f0f2f5;
`;
