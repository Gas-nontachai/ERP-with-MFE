// src/layouts/MainLayout.tsx
import { Layout } from "antd";
import Sidebar from "../components/Sidebar";

const { Content } = Layout;

export default function MainLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar />
      <Layout>
        <Content>{children}</Content>
      </Layout>
    </Layout>
  );
}
