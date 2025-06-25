import { getUser } from "../utils/auth";
import { User } from "../types";

import { Typography, Layout, Card, Descriptions, Avatar } from "antd";
import dayjs from "dayjs";

const { Title } = Typography;
const { Content } = Layout;

export default function Profile() {
  const user: User | null = getUser();

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 600, margin: "40px auto", width: "100%" }}>
        <Card>
          <div
            style={{
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
            }}
          >
            <Avatar
              size={80}
              style={{ marginBottom: 16, backgroundColor: "#87d068" }}
            >
              {user?.name?.[0].toUpperCase() || "U"}
            </Avatar>
            <Title level={2} style={{ textAlign: "center" }}>
              Profile
            </Title>
          </div>

          <Descriptions column={1} bordered style={{ marginTop: 24 }}>
            <Descriptions.Item label="User ID">
              {user?.userId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Name">
              {user?.name || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Email">
              {user?.email || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Role ID">
              {user?.roleId || "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Created At">
              {user?.createdAt
                ? dayjs(user.createdAt).format("DD/MM/YYYY HH:mm")
                : "N/A"}
            </Descriptions.Item>
            <Descriptions.Item label="Updated At">
              {user?.updatedAt
                ? dayjs(user.updatedAt).format("DD/MM/YYYY HH:mm")
                : "N/A"}
            </Descriptions.Item>
          </Descriptions>
        </Card>
      </Content>
    </Layout>
  );
}
