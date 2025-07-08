import React, { Suspense } from "react";

const ProductManageApp = React.lazy(
  () => import("product_manage/ProductManageApp")
);

export default function ProductManage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <ProductManageApp />
    </Suspense>
  );
}
