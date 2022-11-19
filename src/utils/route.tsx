import { RedirectTo } from "@/components";
import { RouterAuth } from "@/routes";
import cloneDeep from "lodash/cloneDeep";
import { getToken } from "@/services/auth-provider";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import SubMenu from "antd/es/menu/SubMenu";
export const routerFliter = (
  routers: RouterAuth[],
  auth: number | undefined
) => {
  const temp = cloneDeep(routers);
  return temp.map((item) => {
    item.child = item?.child?.filter((v) => v.auth === auth);
    return item;
  });
};
export const generateRouter = (routers: RouterAuth[]) => {
  const temp = cloneDeep(routers);
  return temp.map((item: RouterAuth) => {
    if (item.child) {
      item.children = generateRouter(item.child);
    }
    if (item.auth === 0) {
      if (!getToken()) {
        item.element = <RedirectTo to="/login" replace={true} />;
      } else item.element = item.component;
    } else item.element = item.component;

    return item;
  });
};
export const generateMenu = (menus: RouterAuth[]) => {
  return menus.map((item) => {
    if (item.auth !== undefined) {
      if (Array.isArray(item.child) && item.child.length > 0) {
        return (
          <SubMenu key={item.name} icon={item.icon} title={item.name}>
            {generateMenu(item.child)}
          </SubMenu>
        );
      }
      return (
        <Menu.Item key={item.path} icon={item.icon}>
          <Link to={item.path!}>{item.name}</Link>
        </Menu.Item>
      );
    }
  });
};
export const renderMenu = (datas?: RouterAuth[]) => {
  // && (Array.isArray(datas[0].children) && datas[0].children.length > 0)
  if (Array.isArray(datas) && datas.length > 0) {
    //const homeMenus = datas[0].children.filter((item) => item.path === '/home');
    //if ((Array.isArray(homeMenus) && homeMenus.length > 0) && (Array.isArray(homeMenus[0].children) && homeMenus[0].children.length > 0)) {
    // const realHomeMenus = homeMenus[0].children;
    return generateMenu(datas);
    //}
  }
  return null;
};
