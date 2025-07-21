import { useState } from "react";
import { Typography, Card, Select, Spin } from "antd";
import RolePermissionTable from "../components/RolePermissionTable";
import { useRoles } from "../hooks/useRoles";
import { useTranslation } from "react-i18next";
import NoPermission from "../components/NoPermission";
import { useHasPermission } from "../utils/permissionUtils";

const { Title } = Typography;

export default function RolePermissionPage() {
  const scope = "permissions";
  const { roles, isLoading } = useRoles();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);
  const { t } = useTranslation();

  const handleChange = (value: string) => {
    setSelectedRoleId(value);
  };
  const hasViewPermission = useHasPermission(scope, "view");
  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      {hasViewPermission ? (
        <Card>
          <Title level={3}>{t("permission.title")}</Title>
          {isLoading ? (
            <Spin />
          ) : (
            <Select
              showSearch
              placeholder={t("permission.select_role")}
              optionFilterProp="children"
              onChange={handleChange}
              style={{ width: "100%", marginBottom: 16 }}
              value={selectedRoleId || undefined}
              filterOption={(input, option) =>
                typeof option?.label === "string" &&
                option.label.toLowerCase().includes(input.toLowerCase())
              }
              options={roles.map((role) => ({
                label: role.name,
                value: role.id,
              }))}
            />
          )}

          {selectedRoleId && <RolePermissionTable roleId={selectedRoleId} />}
        </Card>
      ) : (
        <div>
          <NoPermission />
        </div>
      )}
    </div>
  );
}
