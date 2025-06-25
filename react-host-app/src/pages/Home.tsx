import { Typography, Layout, Card } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 600, margin: "40px auto", width: "100%" }}>
        <Card>
          <Title level={2} style={{ textAlign: "center" }}>
            ระบบจัดการผู้ใช้และสิทธิ์ (User Management System)
          </Title>
        </Card>
      </Content>
    </Layout>
  );
}
