// src/router/routes.tsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import { ReactNode } from "react";

export type RouteItem = {
  path: string;
  element: ReactNode;
  label?: string;
  showInMenu?: boolean;
  layout?: "main" | "auth"; // << เพิ่มตรงนี้
  protected?: boolean;
};

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
    path: "/login",
    element: <Login />,
    layout: "auth", // << ไม่มี Navbar
  },
];
