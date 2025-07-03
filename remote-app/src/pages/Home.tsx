import { Typography, Layout, Card } from "antd";
import { useTranslation } from "react-i18next";

const { Title } = Typography;
const { Content } = Layout;

export default function Home() {
  const { t } = useTranslation();

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 600, margin: "40px auto", width: "100%" }}>
        <Card>
          <Title level={2} style={{ textAlign: "center" }}>
            {t("home.title")}
          </Title>
        </Card>
      </Content>
    </Layout>
  );
}
