// src/components/Navbar.tsx
import { Menu, Dropdown, Avatar } from "antd";
import { Link, useLocation } from "react-router-dom";
import { routeConfig } from "../router/routes";
import { UserOutlined } from "@ant-design/icons";
import { useLogout } from "../utils/logout";

export default function Navbar() {
  const location = useLocation();
  const logout = useLogout();

  const profileMenu = (
    <Menu>
      <Menu.Item key="view-profile">
        <Link to="/profile">ดูโปรไฟล์</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <span onClick={logout}>Logout</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Menu mode="horizontal" selectedKeys={[location.pathname]} theme="light">
      {routeConfig
        .filter((route) => route.showInMenu)
        .map((route) => (
          <Menu.Item key={route.path}>
            <Link to={route.path}>{route.label}</Link>
          </Menu.Item>
        ))}
      <Menu.Item key="profile" style={{ marginLeft: "auto" }}>
        <Dropdown overlay={profileMenu} placement="bottomRight">
          <span
            style={{ cursor: "pointer", display: "flex", alignItems: "center" }}
          >
            <Avatar icon={<UserOutlined />} style={{ marginRight: 8 }} />
            โปรไฟล์
          </span>
        </Dropdown>
      </Menu.Item>
    </Menu>
  );
}
