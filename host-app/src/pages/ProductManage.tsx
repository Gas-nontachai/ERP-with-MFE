import React, { Suspense } from "react";

const ProductManageApp = React.lazy(
  () => import("product_manage/ProductManageApp")
);

export default function ProductManage() {
  return (
    <Suspense
      fallback={
        <div className="w-8 h-8 border-4 border-blue-500 border-t-transparent rounded-full animate-spin"></div>
      }
    >
      <ProductManageApp />
    </Suspense>
  );
}
