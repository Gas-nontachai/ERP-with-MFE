// src/router/routes.tsx
import Home from "../pages/Home";
import Permission from "../pages/Permission";
import Menu from "../pages/Menu";
import Role from "../pages/Role";
import User from "../pages/User";
import { RouteItem } from "../types";

import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  FundViewOutlined,
} from "@ant-design/icons";

export const routeConfig: RouteItem[] = [
  {
    path: "/",
    element: <Home />,
    label: "slider.home",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <HomeOutlined />,
  },
  {
    path: "/user",
    element: <User />,
    label: "slider.user",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <UserOutlined />,
  },
  {
    path: "/role",
    element: <Role />,
    label: "slider.role",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <SettingOutlined />,
  },
  {
    path: "/menu",
    element: <Menu />,
    label: "slider.menu",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <AppstoreOutlined />,
  },
  {
    path: "/permission",
    element: <Permission />,
    label: "slider.permission",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <FundViewOutlined />,
  },
];
