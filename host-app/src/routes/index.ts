import React from "react";
import { NavItem } from "../types";
import CheckStore from "../pages/CheckStore";
import Home from "../pages/Home";
import Profile from "../pages/Profile";
import Login from "../pages/Login";
import NotFound from "../pages/NotFound";

export const navItems: NavItem[] = [
  {
    to: "/",
    label: "MyApp",
    className: "btn btn-ghost text-xl",
    showInNav: true,
  },
];

export const routes = [
  { path: "/", element: React.createElement(Home) },
  { path: "/profile", element: React.createElement(Profile) },
  { path: "/login", element: React.createElement(Login) },
  { path: "/checkstore", element: React.createElement(CheckStore) },
  { path: "*", element: React.createElement(NotFound) },
];
