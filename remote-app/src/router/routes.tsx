// src/router/routes.tsx
import Home from "../pages/Home";
import Profile from "../pages/Profile";
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
    label: "หน้าแรก",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <HomeOutlined />,
  },
  {
    path: "/user",
    element: <User />,
    label: "ผู้ใช้",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <UserOutlined />,
  },
  {
    path: "/role",
    element: <Role />,
    label: "บทบาท",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <UserOutlined />,
  },
  {
    path: "/menu",
    element: <Menu />,
    label: "เมนู",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <AppstoreOutlined />,
  },
  {
    path: "/permission",
    element: <Permission />,
    label: "สิทธิ์การเข้าถึง",
    showInMenu: true,
    layout: "main",
    protected: true,
    icon: <FundViewOutlined />,
  },
  {
    path: "/profile",
    element: <Profile />,
    layout: "main",
    protected: true,
    icon: <SettingOutlined />,
  },
];
