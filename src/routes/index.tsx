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
  IdcardOutlined,
  PieChartOutlined,
  TeamOutlined,
  UserOutlined,
} from "@ant-design/icons";
import { UserScreen } from "@/pages/user";
import { PaperUpload, PatentUpload, SoftUpload } from "@/pages/sci_updoad";
import { SciPublish } from "@/pages/sci_ad_publish";
import { AdminTeac } from "@/pages/admin_teac";
import { AdminSci } from "@/pages/admin_sci";
import { SciExam } from "@/pages/sci_ad_exam";
import { SciAward } from "@/pages/sci_award";
export type RouterAuth = RouteObject & {
  name: string;
  icon?: React.ReactNode;
  child?: RouterAuth[];
  auth?: number;
  component?: React.ReactElement;
};
const teacher = [
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
    icon: <PieChartOutlined />,
    auth: 1,
    child: [
      {
        path: "/sci/patent",
        name: "专利上传",
        index: true,
        component: <PatentUpload />,
        auth: 1,
      },
      {
        path: "/sci/soft",
        name: "软著上传",
        component: <SoftUpload />,
        auth: 1,
      },
      {
        path: "/sci/paper",
        name: "论文上传",
        component: <PaperUpload />,
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
  {
    path: "/sciaward",
    name: "个人奖项信息",
    component: <SciAward />,
    auth: 1,
    icon: <IdcardOutlined />,
  },
];
const sciManager = [
  {
    path: "/",
    name: "项目信息发布",
    index: true,
    component: <SciPublish />,
    auth: 2,
    icon: <DesktopOutlined />,
  },
  {
    path: "/sciexam",
    name: "项目审批",
    component: <SciExam />,
    auth: 2,
    icon: <FileOutlined />,
  },
  {
    path: "/user",
    name: "个人信息",
    component: <UserScreen />,
    auth: 2,
    icon: <UserOutlined />,
  },
];
const admin = [
  {
    path: "/",
    name: "教师信息管理",
    index: true,
    component: <AdminTeac />,
    auth: 3,
    icon: <DesktopOutlined />,
  },
  {
    path: "/scimanager",
    name: "科研管理员信息管理",
    component: <AdminSci />,
    auth: 3,
    icon: <FileOutlined />,
  },
  {
    path: "/user",
    name: "个人信息",
    component: <UserScreen />,
    auth: 3,
    icon: <UserOutlined />,
  },
];
export const routes: RouterAuth[] = [
  {
    path: "/",
    name: "main",
    component: <Home />,
    auth: 0,
    child: [...teacher, ...sciManager, ...admin],
  },
  { path: "/login", name: "login", component: <Login /> },
  { path: "*", name: "404", component: <NotFound /> },
];
export const MainRouter = () => {
  const { user } = useAuth();
  console.log(user?.auth);

  console.log("s", routerFliter(routes, user?.auth));
  return useRoutes(generateRouter(routerFliter(routes, user?.auth)));
};
