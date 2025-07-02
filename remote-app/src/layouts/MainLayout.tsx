import { Layout } from "antd";
import Sidebar from "../components/Sidebar";
import { useState } from "react";
import { routeConfig } from "../router/routes";

const { Content } = Layout;

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [section, setSection] = useState(routeConfig[0].path);
  const currentRoute = routeConfig.find((r) => r.path === section);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar section={section} setSection={setSection} />
      <Layout>
        <Content>{currentRoute ? currentRoute.element : children}</Content>
      </Layout>
    </Layout>
  );
}
