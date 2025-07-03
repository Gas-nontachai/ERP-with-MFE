import {
  Typography,
  Layout,
  Card,
  Input,
  Button,
  Table,
  Space,
  Popconfirm,
  Empty,
  Select,
} from "antd";
import { Controller } from "react-hook-form";
import { useState, useMemo } from "react";
import { User } from "../types";
import { useUsers } from "../hooks/useUsers";
import { useRoles } from "../hooks/useRoles";
import { useTranslation } from "react-i18next";
import PermissionWrapper from "../components/PermissionWrapper";
import NoPermission from "../components/NoPermission";
import { useHasPermission } from "../utils/permissionUtils";

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

export default function UserPage() {
  const scope = "users";
  const { t } = useTranslation();
  const {
    users,
    isLoading,
    control,
    handleSubmit,
    onSubmit,
    createUser,
    deleteUser,
    editingUserId,
    startEdit,
    cancelEdit,
    updateUser,
  } = useUsers();
  const { roles } = useRoles();
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const filteredUsers = useMemo(() => {
    if (!searchTerm.trim()) return users;
    const lowerSearch = searchTerm.toLowerCase();
    return users.filter(
      (user) =>
        user.name.toLowerCase().includes(lowerSearch) ||
        (user.email?.toLowerCase().includes(lowerSearch) ?? false)
    );
  }, [users, searchTerm]);

  const hasViewPermission = useHasPermission(scope, "view");
  const hasActionPermission = useHasPermission(scope, ["update", "delete"]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      {hasViewPermission ? (
        <Content style={{ maxWidth: 800, margin: "40px auto", width: "100%" }}>
          {/* ปุ่มเปิด/ปิดฟอร์ม */}
          <PermissionWrapper permission={scope} action={"create"}>
            {" "}
            <Button
              onClick={() => setFormVisible((v) => !v)}
              style={{ marginBottom: 16 }}
              type="default"
            >
              {formVisible
                ? t("action.hide_form")
                : editingUserId
                ? t("action.show_edit_form")
                : t("action.show_create_form")}
            </Button>
          </PermissionWrapper>

          {formVisible && (
            <Card
              bordered={false}
              style={{
                boxShadow: "0 2px 8px rgba(0,0,0,0.1)",
                marginBottom: 24,
              }}
            >
              <Title level={3}>
                {editingUserId ? t("action.edit") : t("action.create")}
              </Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: t("user.name_required") }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("user.name_placeholder")}
                      style={{ marginBottom: 12 }}
                    />
                  )}
                />
                <Controller
                  name="email"
                  control={control}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("user.email_placeholder")}
                      style={{ marginBottom: 12 }}
                    />
                  )}
                />
                <Controller
                  name="password"
                  control={control}
                  rules={
                    !editingUserId
                      ? { required: t("user.password_required") }
                      : undefined
                  }
                  render={({ field }) => (
                    <Input.Password
                      {...field}
                      placeholder={t("user.password_placeholder")}
                      disabled={!!editingUserId}
                      style={{ marginBottom: 12 }}
                    />
                  )}
                />

                <Controller
                  name="roleId"
                  control={control}
                  render={({ field }) => (
                    <Select
                      {...field}
                      showSearch
                      placeholder={t("user.role_placeholder")}
                      optionFilterProp="children"
                      style={{ width: "100%", marginBottom: 16 }}
                      filterOption={(input, option) =>
                        typeof option?.label === "string" &&
                        option.label.toLowerCase().includes(input.toLowerCase())
                      }
                    >
                      {roles.map((role) => (
                        <Option key={role.id} value={role.id}>
                          {role.name}
                        </Option>
                      ))}
                    </Select>
                  )}
                />
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={createUser.isPending || updateUser.isPending}
                  >
                    {editingUserId ? t("action.update") : t("action.create")}
                  </Button>
                  {editingUserId && (
                    <Button
                      onClick={() => {
                        cancelEdit();
                        // ถ้าต้องการให้ฟอร์มปิดตอน cancel
                        // setFormVisible(false);
                      }}
                    >
                      {t("action.cancel")}
                    </Button>
                  )}
                </Space>
              </form>
            </Card>
          )}

          <Card
            bordered={false}
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)" }}
            title={
              <Search
                placeholder={t("user.search_placeholder")}
                allowClear
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                enterButton={false}
              />
            }
          >
            <Table<User>
              dataSource={filteredUsers}
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty
                    description={
                      searchTerm
                        ? t("user.no_users_found", { searchTerm })
                        : t("user.no_users_available")
                    }
                  />
                ),
              }}
              columns={[
                {
                  title: t("user.name"),
                  dataIndex: "name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  sortDirections: ["ascend", "descend"],
                },
                {
                  title: t("user.email"),
                  dataIndex: "email",
                  ellipsis: true,
                },
                {
                  title: t("user.role"),
                  dataIndex: "role",
                  render: (role: { name: string }) => role?.name,
                  ellipsis: true,
                },
                ...(hasActionPermission
                  ? [
                      {
                        title: t("action.title"),
                        render: (_: any, record: User) => (
                          <Space>
                            {" "}
                            <PermissionWrapper
                              permission={scope}
                              action={"update"}
                            >
                              <Button
                                size="small"
                                onClick={() => {
                                  startEdit(record);
                                  if (!formVisible) setFormVisible(true);
                                }}
                              >
                                {t("action.edit")}
                              </Button>
                            </PermissionWrapper>
                            <PermissionWrapper
                              permission={scope}
                              action={"delete"}
                            >
                              <Popconfirm
                                title={t("user.delete_confirm")}
                                onConfirm={() =>
                                  deleteUser.mutate(record.userId)
                                }
                              >
                                <Button danger size="small">
                                  {t("action.delete")}
                                </Button>
                              </Popconfirm>
                            </PermissionWrapper>
                          </Space>
                        ),
                        width: 140,
                      },
                    ]
                  : []),
              ]}
              pagination={{ pageSize: 8 }}
            />
          </Card>
        </Content>
      ) : (
        <Content>
          <NoPermission />
        </Content>
      )}
    </Layout>
  );
}
