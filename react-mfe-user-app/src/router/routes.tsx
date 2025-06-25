// src/router/routes.tsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Permission from "../pages/Permission";
import Menu from "../pages/Menu";
import Role from "../pages/Role";
import { RouteItem } from "../types";

import {
  HomeOutlined,
  UserOutlined,
  SettingOutlined,
  AppstoreOutlined,
  LoginOutlined,
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
  {
    path: "/login",
    element: <Login />,
    layout: "auth",
    icon: <LoginOutlined />,
  },
];
