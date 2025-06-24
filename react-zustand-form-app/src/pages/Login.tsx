import React from "react";
import { Typography, Layout, Card, Input, Button } from "antd";
import { useForm, Controller } from "react-hook-form";
import { useAuth, LoginForm } from "../hooks/useAuth";

const { Title } = Typography;
const { Content } = Layout;

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const loginMutation = useAuth();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 400, margin: "40px auto", width: "100%" }}>
        <Card>
          <Title level={2} style={{ textAlign: "center" }}>
            Login
          </Title>
          <form onSubmit={handleSubmit(onSubmit)}>
            <div style={{ marginBottom: 16 }}>
              <label>Email</label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Please input your email!" }}
                render={({ field }) => <Input {...field} />}
              />
              {errors.email && (
                <p style={{ color: "red", margin: 0 }}>
                  {errors.email.message}
                </p>
              )}
            </div>

            <div style={{ marginBottom: 16 }}>
              <label>Password</label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Please input your password!" }}
                render={({ field }) => <Input.Password {...field} />}
              />
              {errors.password && (
                <p style={{ color: "red", margin: 0 }}>
                  {errors.password.message}
                </p>
              )}
            </div>

            <Button
              type="primary"
              htmlType="submit"
              block
              loading={loginMutation.status === "pending"}
            >
              Log in
            </Button>
          </form>
        </Card>
      </Content>
    </Layout>
  );
}
