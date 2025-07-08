// App.tsx
import { useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { renderPage } from "./routes";
import { useLanguageStore } from "host/languageStore"; // สำหรับระบบ MFE ที่ใช้ภาษา

function App() {
  const [selectedPage, setSelectedPage] = useState("/");

  return (
    <MainLayout
      selectedPage={selectedPage}
      onSelectPage={setSelectedPage}
      useLanguageStore={useLanguageStore}
    >
      {renderPage(selectedPage)}
    </MainLayout>
  );
}

export default App;
