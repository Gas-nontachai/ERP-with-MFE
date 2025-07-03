import { Layout, Menu, Button } from "antd";
import { useState } from "react";
import { routeConfig } from "../router/routes";
import { MenuUnfoldOutlined, MenuFoldOutlined } from "@ant-design/icons";
import { useTranslation } from "react-i18next";

const { Sider } = Layout;

type SidebarProps = {
  section: string;
  setSection: (section: string) => void;
};

export default function Sidebar({ section, setSection }: SidebarProps) {
  const [collapsed, setCollapsed] = useState(false);
  const toggleCollapsed = () => setCollapsed(!collapsed);
  const { t } = useTranslation();

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
        height: "100vh",
        padding: 0,
      }}
    >
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
      <Menu
        theme="light"
        mode="inline"
        selectedKeys={[section]}
        onClick={({ key }) => setSection(key)}
        style={{
          backgroundColor: "#fff",
          flexGrow: 1,
          overflowY: "auto",
          borderRight: 0,
        }}
        items={routeConfig
          .filter((r) => r.showInMenu)
          .map((route) => ({
            key: route.path,
            icon: route.icon,
            label: t(route.label ?? ""),
          }))}
      />
    </Sider>
  );
}
