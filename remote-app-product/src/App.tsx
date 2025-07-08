// App.tsx
import { useState } from "react";
import Layout from "./layouts/MainLayout";
import { renderPage } from "./routes";

function App() {
  const [selectedPage, setSelectedPage] = useState("/");

  return (
    <Layout selectedPage={selectedPage} onSelectPage={setSelectedPage}>
      {renderPage(selectedPage)}
    </Layout>
  );
}

export default App;
