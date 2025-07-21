// App.tsx
import { useEffect, useState } from "react";
import MainLayout from "./layouts/MainLayout";
import { renderPage } from "./routes";
import { useLanguageStore } from "host/languageStore";

function App() {
  const [selectedPage, setSelectedPage] = useState("/");
  // ✅ sync URL -> state
  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const page = params.get("page");
    if (page) setSelectedPage("/" + page); // เช่น "index" -> "/index"
  }, []);

  // ✅ sync state -> URL
  const handleSelectPage = (page: string) => {
    setSelectedPage(page);
    const pageName = page.replace("/", ""); // "/report" -> "report"
    const newUrl = `${window.location.pathname}?page=${pageName}`;
    window.history.pushState({}, "", newUrl);
  };

  return (
    <MainLayout
      selectedPage={selectedPage}
      onSelectPage={handleSelectPage}
      useLanguageStore={useLanguageStore}
    >
      {renderPage(selectedPage)}
    </MainLayout>
  );
}

export default App;
