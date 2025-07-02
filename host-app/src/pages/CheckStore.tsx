import React, { JSX } from "react";
import { useAuthStore } from "../stores/authStore";
import { UseLanguageStore } from "../stores/languageStore";

export default function ShowAllStoresPage(): JSX.Element {
  // เรียก hook แยกกันก่อน (ตามกฎ Hooks)
  const authState = useAuthStore((state) => state);
  const languageStore = UseLanguageStore((state) => state);

  // รวม states เป็น object เดียว
  const allStates: Record<string, unknown> = {
    auth: authState,
    language: languageStore,
  };

  return (
    <div>
      <h1>ข้อมูลทั้งหมดจากทุก store</h1>
      {Object.entries(allStates).map(([key, state]) => (
        <section key={key}>
          <h2>{key} Store</h2>
          <pre>{JSON.stringify(state, null, 2)}</pre>
        </section>
      ))}
    </div>
  );
}
