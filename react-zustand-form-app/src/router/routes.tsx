// src/router/routes.tsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
import Menu from "../pages/Menu";
import Role from "../pages/Role";
import { RouteItem } from "../types";

export const routeConfig: RouteItem[] = [
  {
    path: "/",
    element: <Home />,
    label: "หน้าแรก",
    showInMenu: true,
    layout: "main",
    protected: true,
  },
  {
    path: "/role",
    element: <Role />,
    label: "บทบาท",
    showInMenu: true,
    layout: "main",
    protected: true,
  },
  {
    path: "/menu",
    element: <Menu />,
    label: "เมนู",
    showInMenu: true,
    layout: "main",
    protected: true,
  },
  {
    path: "/profile",
    element: <Profile />,
    layout: "main",
    protected: true,
  },
  {
    path: "/login",
    element: <Login />,
    layout: "auth",
  },
];
