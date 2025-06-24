import { Typography, Layout, Card, Form, Input, Button } from "antd";

const { Title } = Typography;
const { Content } = Layout;

export default function Login() {
  const onFinish = (values: any) => {
    // Handle login logic here
    console.log("Login values:", values);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 400, margin: "40px auto", width: "100%" }}>
        <Card>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <Form
            name="login"
            layout="vertical"
            onFinish={onFinish}
            autoComplete="off"
          >
            <Form.Item
              label="Username"
              name="username"
              rules={[
                { required: true, message: "Please input your username!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Password"
              name="password"
              rules={[
                { required: true, message: "Please input your password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit" block>
                Log in
              </Button>
            </Form.Item>
          </Form>
        </Card>
      </Content>
    </Layout>
  );
}
