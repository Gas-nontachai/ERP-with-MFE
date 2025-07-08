import React, { Suspense } from "react";

const UserManageApp = React.lazy(() => import("user_manage/UserManageApp"));

export default function UserManage() {
  return (
    <Suspense
      fallback={
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      }
    >
      <UserManageApp />
    </Suspense>
  );
}
