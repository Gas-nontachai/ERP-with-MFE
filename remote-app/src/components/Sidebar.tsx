// src/components/Sidebar.tsx
import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import { useNavigate, useLocation } from "react-router-dom";
import { routeConfig } from "../router/routes";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const toggleCollapsed = () => {
    setCollapsed(!collapsed);
  };

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      width={200}
      style={{
        backgroundColor: "#fff",
        borderRight: "1px solid #f0f0f0",
        display: "flex",
        flexDirection: "column",
        height: "100vh", // เต็มความสูง viewport
        padding: 0,
      }}
    >
      {/* Header: ปุ่ม toggle */}
      <div
        style={{
          padding: "10px",
          textAlign: "center",
          borderBottom: "1px solid #f0f0f0",
          flexShrink: 0,
        }}
      >
        <Button
          type="text"
          onClick={toggleCollapsed}
          icon={collapsed ? <MenuUnfoldOutlined /> : <MenuFoldOutlined />}
        />
      </div>

      {/* เมนูหลัก */}
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[location.pathname]}
        onClick={({ key }) => navigate(key)}
        style={{
          backgroundColor: "#fff",
          flexGrow: 1, // ขยายเต็มพื้นที่กลาง
          overflowY: "auto", // scroll ถ้าเมนูเยอะ
          borderRight: 0,
        }}
        items={routeConfig
          .filter((r) => r.showInMenu)
          .map((route) => ({
            key: route.path,
            icon: route.icon,
            label: route.label,
          }))}
      />
    </Sider>
  );
}
