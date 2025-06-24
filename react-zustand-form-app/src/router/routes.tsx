// src/router/routes.tsx
import Home from "../pages/Home";
import Login from "../pages/Login";
import Profile from "../pages/Profile";
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
    path: "/profile",
    element: <Profile />,
    layout: "main",
  },
  {
    path: "/login",
    element: <Login />,
    layout: "auth",
  },
];
