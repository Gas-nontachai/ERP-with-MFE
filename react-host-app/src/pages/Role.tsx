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
} from "antd";
import { Controller } from "react-hook-form";
import { useState, useMemo } from "react";
import { RoleData } from "../types";
import { useRoles } from "../hooks/useRoles";

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

export default function RolePage() {
  const {
    roles,
    isLoading,
    control,
    handleSubmit,
    onSubmit,
    createRole,
    deleteRole,
    editingRoleId,
    startEdit,
    cancelEdit,
    updateRole,
  } = useRoles();

  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const filteredRoles = useMemo(() => {
    if (!searchTerm.trim()) return roles;
    const lowerSearch = searchTerm.toLowerCase();
    return roles.filter(
      (role) =>
        role.name.toLowerCase().includes(lowerSearch) ||
        (role.description?.toLowerCase().includes(lowerSearch) ?? false)
    );
  }, [roles, searchTerm]);

  // เมื่อแก้ไขเสร็จ หรือกด cancel ให้เปิดฟอร์มอัตโนมัติ (ถ้าปิดอยู่)
  // อันนี้ optional ถ้าต้องการให้ฟอร์มเปิดอัตโนมัติเวลา edit
  // useEffect(() => {
  //   if (editingRoleId && !formVisible) setFormVisible(true);
  // }, [editingRoleId]);

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
            : editingRoleId
            ? "Show Edit Role"
            : "Show Create Role"}
        </Button>

        {formVisible && (
          <Card
            bordered={false}
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 24 }}
          >
            <Title level={3}>
              {editingRoleId ? "Edit Role" : "Create Role"}
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: "Name is required" }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder="Role Name"
                    style={{ marginBottom: 12 }}
                  />
                )}
              />
              <Controller
                name="description"
                control={control}
                render={({ field }) => (
                  <Input.TextArea
                    {...field}
                    placeholder="Description"
                    rows={3}
                    style={{ marginBottom: 12 }}
                  />
                )}
              />
              <Space>
                <Button
                  type="primary"
                  htmlType="submit"
                  loading={createRole.isPending || updateRole.isPending}
                >
                  {editingRoleId ? "Update" : "Create"}
                </Button>
                {editingRoleId && (
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
              placeholder="Search roles"
              allowClear
              onChange={(e) => setSearchTerm(e.target.value)}
              style={{ width: 300 }}
              enterButton={false}
            />
          }
        >
          <Table
            dataSource={filteredRoles}
            rowKey="id"
            loading={isLoading}
            locale={{
              emptyText: (
                <Empty
                  description={
                    searchTerm
                      ? `No roles found for "${searchTerm}"`
                      : "No roles available"
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
                title: "Description",
                dataIndex: "description",
                ellipsis: true,
              },
              {
                title: "Actions",
                render: (_: any, record: RoleData) => (
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
                      title="Are you sure to delete this role?"
                      onConfirm={() => deleteRole.mutate(record.id)}
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
