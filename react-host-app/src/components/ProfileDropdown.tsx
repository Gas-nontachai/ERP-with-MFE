// src/components/ProfileDropdown.tsx
import { Dropdown, Menu, Avatar, Space, Tooltip } from "antd";
import { Link } from "react-router-dom";
import { UserOutlined } from "@ant-design/icons";

export default function ProfileDropdown({
  logout,
  collapsed,
}: {
  logout: () => void;
  collapsed: boolean;
}) {
  const menu = (
    <Menu>
      <Menu.Item key="view-profile">
        <Link to="/profile">ดูโปรไฟล์</Link>
      </Menu.Item>
      <Menu.Divider />
      <Menu.Item key="logout">
        <span onClick={logout}>ออกจากระบบ</span>
      </Menu.Item>
    </Menu>
  );

  return (
    <Dropdown overlay={menu} trigger={["click"]} placement="topCenter">
      <Tooltip title={collapsed ? "โปรไฟล์" : ""}>
        <Space
          style={{
            cursor: "pointer",
            width: "100%",
            justifyContent: collapsed ? "center" : "start",
          }}
        >
          <Avatar size="small" icon={<UserOutlined />} />
          {!collapsed && <span style={{ fontWeight: 500 }}>ชื่อผู้ใช้</span>}
        </Space>
      </Tooltip>
    </Dropdown>
  );
}
