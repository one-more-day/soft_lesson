import { Layout, Menu } from "antd";
import { useState } from "react";
import type { MenuClickEventHandler } from "rc-menu/lib/interface";
import { renderMenu } from "@/utils/route";
import { routes } from "@/routes";
import logo from "@/assets/logo.svg";
import styled from "@emotion/styled";
const { Sider } = Layout;
export const MenuSider = () => {
  const [collapsed, setCollapsed] = useState<boolean>(false);
  const handleClick: MenuClickEventHandler = (e) => {
    console.log("click ", e);
  };
  return (
    <Sider
      theme="light"
      width={180}
      collapsedWidth={80}
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <MenuHeader title={"dsad"}>教师端</MenuHeader>
      <Menu onClick={handleClick} mode="inline">
        {renderMenu(routes[0].child)}
      </Menu>
    </Sider>
  );
};

const MenuHeader = styled.div`
  text-align: center;
  line-height: 4rem;
  height: 4rem;
`;
