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
import { useTranslation } from "react-i18next";

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
  const { t } = useTranslation();

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
            ? t("action.hide_form")
            : editingRoleId
            ? t("action.show_edit_form")
            : t("action.show_create_form")}
        </Button>

        {formVisible && (
          <Card
            bordered={false}
            style={{ boxShadow: "0 2px 8px rgba(0,0,0,0.1)", marginBottom: 24 }}
          >
            <Title level={3}>
              {editingRoleId ? t("action.edit") : t("action.create")}
            </Title>
            <form onSubmit={handleSubmit(onSubmit)}>
              <Controller
                name="name"
                control={control}
                rules={{ required: t("role.name_required") }}
                render={({ field }) => (
                  <Input
                    {...field}
                    placeholder={t("role.name_placeholder")}
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
                    placeholder={t("role.description_placeholder")}
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
                  {editingRoleId ? t("action.update") : t("action.create")}
                </Button>
                {editingRoleId && (
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
              placeholder={t("role.search_placeholder")}
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
                      ? t("role.no_roles_found", { search: searchTerm })
                      : t("role.no_roles_available")
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
                      {t("action.edit")}
                    </Button>
                    <Popconfirm
                      title="Are you sure to delete this role?"
                      onConfirm={() => deleteRole.mutate(record.id)}
                    >
                      <Button danger size="small">
                        {t("action.delete")}
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
