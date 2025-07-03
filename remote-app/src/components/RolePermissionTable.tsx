import { Table, Checkbox, Button, Spin, message } from "antd";
import { useForm, Controller, SubmitHandler } from "react-hook-form";
import { useRolePermissions } from "../hooks/usePermissions";
import { useState, useEffect, useRef } from "react";
import { useTranslation } from "react-i18next";

type PermissionCheckboxes = {
  [menuId: string]: {
    roleId: string;
    view: boolean;
    create: boolean;
    update: boolean;
    delete: boolean;
  };
};

interface Props {
  roleId: string;
}

export default function RolePermissionTable({ roleId }: Props) {
  const { t } = useTranslation();
  const { menus, permissionsMap, isLoading, updatePermissions } =
    useRolePermissions(roleId);
  const { control, handleSubmit, reset } = useForm<{
    permissions: PermissionCheckboxes;
  }>({
    defaultValues: {
      permissions: {},
    },
  });

  const [submitting, setSubmitting] = useState(false);
  const prevResetRef = useRef("");

  useEffect(() => {
    const defaultPerms: PermissionCheckboxes = {};
    menus.forEach((menu) => {
      defaultPerms[menu.id] = permissionsMap[menu.id] ?? {
        roleId,
        view: false,
        create: false,
        update: false,
        delete: false,
      };
    });

    const current = JSON.stringify({ permissions: defaultPerms });
    if (prevResetRef.current !== current) {
      prevResetRef.current = current;
      reset({ permissions: defaultPerms });
    }
  }, [menus, permissionsMap, reset, roleId]);

  const onSubmit: SubmitHandler<{ permissions: PermissionCheckboxes }> = async (
    data
  ) => {
    setSubmitting(true);
    try {
      await updatePermissions(data.permissions);
      message.success(t("action.updated"));
      // oxlint-disable-next-line no-unused-vars
    } catch (error) {
      message.error(t("action.update_failed"));
    } finally {
      setSubmitting(false);
    }
  };

  if (isLoading) return <Spin tip={t("loading")} />;

  const columns = [
    {
      title: t("permission.menu_name.title"),
      dataIndex: "name",
      key: "name",
    },
    ...["view", "create", "update", "delete"].map((perm) => ({
      title: t(`permission.${perm}`),
      key: perm,
      render: (_: any, record: any) => (
        <Controller
          name={`permissions.${record.id}.${perm}` as const}
          control={control}
          render={({ field }) => (
            <Checkbox
              checked={field.value}
              onChange={(e) => field.onChange(e.target.checked)}
              aria-label={t(`permission.menu_name.${perm}`)}
            />
          )}
        />
      ),
    })),
  ];

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Table
        dataSource={menus}
        columns={columns}
        rowKey="id"
        pagination={false}
        bordered
      />
      <Button
        type="primary"
        htmlType="submit"
        loading={submitting}
        style={{ marginTop: 16 }}
      >
        {t("action.save")}
      </Button>
    </form>
  );
}
