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
import { MenuData } from "../types";
import { useMenus } from "../hooks/useMenus";
import { useTranslation } from "react-i18next";
import PermissionWrapper from "../components/PermissionWrapper";
import NoPermission from "../components/NoPermission";
import { useHasPermission } from "../utils/permissionUtils";

const { Title } = Typography;
const { Content } = Layout;
const { Search } = Input;

export default function MenuPage() {
  const scope = "menus";
  const {
    menus,
    isLoading,
    control,
    handleSubmit,
    onSubmit,
    createMenu,
    deleteMenu,
    editingMenuId,
    startEdit,
    cancelEdit,
    updateMenu,
  } = useMenus();
  const { t } = useTranslation();
  const [searchTerm, setSearchTerm] = useState("");
  const [formVisible, setFormVisible] = useState(false);

  const filteredMenus = useMemo(() => {
    if (!searchTerm.trim()) return menus;
    const lowerSearch = searchTerm.toLowerCase();
    return menus.filter(
      (menu) =>
        menu.name.toLowerCase().includes(lowerSearch) ||
        (menu.description?.toLowerCase().includes(lowerSearch) ?? false)
    );
  }, [menus, searchTerm]);

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
                : editingMenuId
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
                {editingMenuId ? t("action.edit") : t("action.create")}
              </Title>
              <form onSubmit={handleSubmit(onSubmit)}>
                <Controller
                  name="name"
                  control={control}
                  rules={{ required: t("menu.name_required") }}
                  render={({ field }) => (
                    <Input
                      {...field}
                      placeholder={t("menu.name_placeholder")}
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
                      placeholder={t("menu.description_placeholder")}
                      rows={3}
                      style={{ marginBottom: 12 }}
                    />
                  )}
                />
                <Space>
                  <Button
                    type="primary"
                    htmlType="submit"
                    loading={createMenu.isPending || updateMenu.isPending}
                  >
                    {editingMenuId ? t("action.update") : t("action.create")}
                  </Button>
                  {editingMenuId && (
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
                placeholder={t("menu.search_placeholder")}
                allowClear
                onChange={(e) => setSearchTerm(e.target.value)}
                style={{ width: 300 }}
                enterButton={false}
              />
            }
          >
            <Table<MenuData>
              dataSource={filteredMenus}
              rowKey="id"
              loading={isLoading}
              locale={{
                emptyText: (
                  <Empty
                    description={
                      searchTerm
                        ? t("menu.no_menus_found", { search: searchTerm })
                        : t("menu.no_menus_available")
                    }
                  />
                ),
              }}
              columns={[
                {
                  title: t("menu.name"),
                  dataIndex: "name",
                  sorter: (a, b) => a.name.localeCompare(b.name),
                  sortDirections: ["ascend", "descend"],
                },
                {
                  title: t("menu.description"),
                  dataIndex: "description",
                  ellipsis: true,
                },
                ...(hasActionPermission
                  ? [
                      {
                        title: t("action.title"),
                        render: (_: any, record: MenuData) => (
                          <Space>
                            <PermissionWrapper
                              permission={scope}
                              action="update"
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
                            <Popconfirm
                              title={t("action.delete_confirm")}
                              onConfirm={() => deleteMenu.mutate(record.id)}
                            >
                              <PermissionWrapper
                                permission={scope}
                                action="delete"
                              >
                                <Button danger size="small">
                                  {t("action.delete")}
                                </Button>
                              </PermissionWrapper>
                            </Popconfirm>
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
