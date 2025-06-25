import { useState } from "react";
import { Typography, Card, Button, Select, Spin } from "antd";
import RolePermissionTable from "../components/RolePermissionTable";
import { useRoles } from "../hooks/useRoles";
import { useNavigate } from "react-router-dom";

const { Title } = Typography;
const { Option } = Select;

export default function RolePermissionPage() {
  const navigate = useNavigate();
  const { roles, isLoading } = useRoles();
  const [selectedRoleId, setSelectedRoleId] = useState<string | null>(null);

  const handleChange = (value: string) => {
    setSelectedRoleId(value);
  };

  return (
    <div style={{ maxWidth: 900, margin: "24px auto" }}>
      <Card>
        <Title level={3}>Manage Permissions by Role</Title>

        {isLoading ? (
          <Spin />
        ) : (
          <Select
            showSearch
            placeholder="Select a role"
            optionFilterProp="children"
            onChange={handleChange}
            style={{ width: "100%", marginBottom: 16 }}
            value={selectedRoleId || undefined}
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

        {selectedRoleId && <RolePermissionTable roleId={selectedRoleId} />}

        <Button style={{ marginTop: 16 }} onClick={() => navigate(-1)}>
          Back
        </Button>
      </Card>
    </div>
  );
}
