import React, { Suspense } from "react";

const UserManageApp = React.lazy(() => import("user_manage/UserManageApp"));

export default function UserManage() {
  return (
    <div className="p-4">
      <Suspense fallback={<div>Loading...</div>}>
        <UserManageApp />
      </Suspense>
    </div>
  );
}
