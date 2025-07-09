import React from "react";
import { NavItem } from "../types";
import CheckStore from "../pages/CheckStore";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";
import UserManage from "../pages/UserManage";
import ProductManage from "../pages/ProductManage";

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "Home",
    className: "btn btn-ghost text-xl",
    showInNav: true,
  },
  {
    to: "/user_manage",
    label: "User Manage",
    className: "btn btn-ghost text-xl",
    showInNav: true,
    permission: "users",
  },
  {
    to: "/product_manage",
    label: "Produt Manage",
    className: "btn btn-ghost text-xl",
    showInNav: true,
    permission: "products",
  },
];

export const routes = [
  { path: "/", element: React.createElement(Home) },
  { path: "/profile", element: React.createElement(Profile) },
  { path: "/login", element: React.createElement(Login) },
  { path: "/checkstore", element: React.createElement(CheckStore) },
  { path: "/user_manage", element: React.createElement(UserManage) },
  { path: "/product_manage", element: React.createElement(ProductManage) },
  { path: "*", element: React.createElement(NotFound) },
];
