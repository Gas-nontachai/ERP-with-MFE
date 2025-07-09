// components/Layout.tsx
import { useState, useEffect } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";
import i18n from "../i18n";
import { useTranslation } from "react-i18next";

interface LayoutProps {
  useLanguageStore: typeof import("host/languageStore").useLanguageStore;
  selectedPage: string;
  onSelectPage: (page: string) => void;
  children: React.ReactNode;
}

export default function Layout({
  useLanguageStore,
  selectedPage,
  onSelectPage,
  children,
}: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);
  const lang = useLanguageStore((state) => state.lang);
  const { t } = useTranslation();

  useEffect(() => {
    if (lang && i18n.language !== lang) {
      i18n.changeLanguage(lang);
    }
  }, [lang]);

  return (
    <Box sx={{ display: "flex", height: "100vh" }}>
      {/* Sidebar */}
      <Sidebar
        collapsed={collapsed}
        onToggleCollapse={() => setCollapsed((prev) => !prev)}
        selectedPage={selectedPage}
        onSelectPage={onSelectPage}
      />

      {/* Content Area */}
      <Box
        sx={{
          width: "100%",
          transition: "margin-left 0.3s ease",
          display: "flex",
          flexDirection: "column",
        }}
      >
        {/* AppBar */}
        <AppBar position="static">
          <Toolbar>
            <Typography variant="h6" noWrap>
              {t("title")}
            </Typography>
          </Toolbar>
        </AppBar>

        {/* Main Content */}
        <Box component="main" sx={{ p: 2, flexGrow: 1 }}>
          {children}
        </Box>
      </Box>
    </Box>
  );
}
