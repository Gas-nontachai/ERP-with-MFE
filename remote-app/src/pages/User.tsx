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

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;
const { Option } = Select;

export default function UserPage() {
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

  // เมื่อแก้ไขเสร็จ หรือกด cancel ให้เปิดฟอร์มอัตโนมัติ (ถ้าปิดอยู่)
  // อันนี้ optional ถ้าต้องการให้ฟอร์มเปิดอัตโนมัติเวลา edit
  // useEffect(() => {
  //   if (editingUserId && !formVisible) setFormVisible(true);
  // }, [editingUserId]);

  return (
    <Layout style={{ minHeight: "100vh", background: "#f0f2f5" }}>
      <Content style={{ maxWidth: 800, margin: "40px auto", width: "100%" }}>
        {/* ปุ่มเปิด/ปิดฟอร์ม */}
        <Button
          onClick={() => setFormVisible((v) => !v)}
          style={{ marginBottom: 16 }}
          type="default"
        >
          {formVisible
            ? "Hide Form"
            : editingUserId
            ? "Show Edit User"
            : "Show Create User"}
        </Button>

        {formVisible && (
          <Card
            bordered={false}
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 24 }}
          >
            <Title level={3}>
              {editingUserId ? "Edit User" : "Create User"}
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="User Name"
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
                    placeholder="email"
                    style={{ marginBottom: 12 }}
                  />
                )}
              />
              <Controller
                name="password"
                control={control}
                rules={
                  !editingUserId
                    ? { required: "Password is required" }
                    : undefined
                }
                render={({ field }) => (
                  <Input.Password
                    {...field}
                    placeholder="Password"
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
                    placeholder="Select a role"
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
                  {editingUserId ? "Update" : "Create"}
                </Button>
                {editingUserId && (
                  <Button
                    onClick={() => {
                      cancelEdit();
                      // ถ้าต้องการให้ฟอร์มปิดตอน cancel
                      // setFormVisible(false);
                    }}
                  >
                    Cancel
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
              placeholder="Search users"
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
              enterButton={false}
            />
          }
        >
          <Table
            dataSource={filteredUsers}
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty
                  description={
                    searchTerm
                      ? `No users found for "${searchTerm}"`
                      : "No users available"
                  }
                />
              ),
            }}
            columns={[
              {
                title: "Name",
                dataIndex: "name",
                sorter: (a, b) => a.name.localeCompare(b.name),
                sortDirections: ["ascend", "descend"],
              },
              {
                title: "Email",
                dataIndex: "email",
                ellipsis: true,
              },
              {
                title: "Role",
                dataIndex: "role",
                render: (role: { name: string }) => role?.name,
                ellipsis: true,
              },
              {
                title: "Actions",
                render: (_: any, record: User) => (
                  <Space>
                    <Button
                      size="small"
                      onClick={() => {
                        startEdit(record);
                        if (!formVisible) setFormVisible(true);
                      }}
                    >
                      Edit
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this user?"
                      onConfirm={() => deleteUser.mutate(record.userId)}
                    >
                      <Button danger size="small">
                        Delete
                      </Button>
                    </Popconfirm>
                  </Space>
                ),
                width: 140,
              },
            ]}
            pagination={{ pageSize: 8 }}
          />
        </Card>
      </Content>
    </Layout>
  );
}
