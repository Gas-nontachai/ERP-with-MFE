import React, { Suspense } from "react";

const UserManageApp = React.lazy(() => import("user_manage/UserManageApp"));

export default function UserManage() {
  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">User Management</h1>
      <Suspense fallback={<div>Loading...</div>}>
        <h1>Load done </h1>
        <UserManageApp />
      </Suspense>
    </div>
  );
}
