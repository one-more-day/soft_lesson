import { NotFound } from "@/components";
import { useAuth } from "@/contexts/auth";
import { Home } from "@/pages/home";
import { Login } from "@/pages/login";
import { SciApply } from "@/pages/sci_apply";
import { SciInfo } from "@/pages/sci_info";
import { generateRouter, routerFliter } from "@/utils/route";
import React from "react";
import { RouteObject, useRoutes } from "react-router-dom";
import {
  DesktopOutlined,
  FileOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserScreen } from "@/pages/user";
export type RouterAuth = RouteObject & {
  name: string;
  icon?: React.ReactNode;
  child?: RouterAuth[];
  auth?: number;
  component?: React.ReactElement;
};
export const routes: RouterAuth[] = [
  {
    path: "/",
    name: "main",
    component: <Home />,
    auth: 0,
    child: [
      {
        path: "/",
        name: "项目信息",
        index: true,
        component: <SciInfo />,
        auth: 1,
        icon: <DesktopOutlined />,
      },
      {
        path: "/sciapply",
        name: "项目申请信息",
        component: <SciApply />,
        auth: 1,
        icon: <FileOutlined />,
      },
      {
        path: "/sci",
        name: "个人科研上传",
        component: <SciInfo />,
        icon: <PieChartOutlined />,
        auth: 1,
        child: [
          {
            path: "/sci/patent",
            name: "专利上传",
            index: true,
            component: <SciApply />,
            auth: 1,
          },
          {
            path: "/sci/soft",
            name: "软著上传",
            component: <SciApply />,
            auth: 1,
          },
          {
            path: "/sci/paper",
            name: "论文上传",
            component: <SciApply />,
            auth: 1,
          },
        ],
      },
      {
        path: "/user",
        name: "个人信息",
        component: <UserScreen />,
        auth: 1,
        icon: <UserOutlined />,
      },
    ],
  },
  { path: "/login", name: "login", component: <Login /> },
  { path: "*", name: "404", component: <NotFound /> },
];
export const MainRouter = () => {
  const { user } = useAuth();
  console.log(generateRouter(routerFliter(routes, user?.auth)));
  return useRoutes(generateRouter(routerFliter(routes, user?.auth)));
};
