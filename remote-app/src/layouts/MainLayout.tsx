import { Layout } from "antd";
import { useEffect, useState } from "react";
import Sidebar from "../components/Sidebar";
import { routeConfig } from "../router/routes";
import i18n from "../i18n";

const { Content } = Layout;

function MainLayoutContent({
  useLanguageStore,
  children,
}: {
  useLanguageStore: typeof import("host/languageStore").useLanguageStore;
  children?: React.ReactNode;
}) {
  const [section, setSection] = useState(routeConfig[0].path);
  const currentRoute = routeConfig.find((r) => r.path === section);

  // เรียก hook ตามปกติ ไม่มีเงื่อนไข
  const lang = useLanguageStore((state) => state.lang);

  // อัปเดตภาษา i18n เมื่อ lang เปลี่ยน (ถ้าต้องการ)
  useEffect(() => {
    if (i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <Layout style={{ minHeight: "100vh" }}>
      <Sidebar section={section} setSection={setSection} />
      <Layout>
        <Content>{currentRoute ? currentRoute.element : children}</Content>
      </Layout>
    </Layout>
  );
}

export default function MainLayout({
  children,
}: {
  children?: React.ReactNode;
}) {
  const [useLanguageStore, setUseLanguageStore] = useState<
    typeof import("host/languageStore").useLanguageStore | null
  >(null);

  useEffect(() => {
    import("host/languageStore")
      .then((mod) => setUseLanguageStore(() => mod.useLanguageStore))
      .catch((err) => {
        console.error("Failed to load languageStore from host", err);
      });
  }, []);

  if (!useLanguageStore) {
    return <div>Loading...</div>; // หรือ Spinner สวยๆ แทนก็ได้
  }

  return (
    <MainLayoutContent
      useLanguageStore={useLanguageStore}
      children={children}
    />
  );
}
