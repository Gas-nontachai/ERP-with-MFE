// src/components/Navbar.tsx
import { Menu } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routeConfig } from "../router/routes";

export default function Navbar() {
  const location = useLocation();

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]} theme="light">
      {routeConfig
        .filter((route) => route.showInMenu)
        .map((route) => (
          <Menu.Item key={route.path}>
            <Link to={route.path}>{route.label}</Link>
          </Menu.Item>
        ))}
    </Menu>
  );
}
