import { Layout, Menu } from "antd";
import { useState } from "react";
import type { MenuClickEventHandler } from "rc-menu/lib/interface";
import { renderMenu, routerFliter } from "@/utils/route";
import { routes } from "@/routes";
import logo from "@/assets/logo.svg";
import styled from "@emotion/styled";
import { useAuth } from "@/contexts/auth";
const { Sider } = Layout;
export const MenuSider = () => {
  const { user } = useAuth();
  const menuRoute = routerFliter(routes, user?.auth);
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
      <MenuHeader title={"dsad"}>
        {user?.auth === 1
          ? "教师端"
          : user?.auth === 2
          ? "科研管理员端"
          : "管理员"}
      </MenuHeader>
      <Menu onClick={handleClick} mode="inline">
        {renderMenu(menuRoute[0].child)}
      </Menu>
    </Sider>
  );
};

const MenuHeader = styled.div`
  text-align: center;
  line-height: 4rem;
  height: 4rem;
`;
