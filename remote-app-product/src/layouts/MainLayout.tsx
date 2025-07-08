// components/Layout.tsx
import { useState } from "react";
import { AppBar, Box, Toolbar, Typography } from "@mui/material";
import Sidebar from "../components/Sidebar";

interface LayoutProps {
  selectedPage: string;
  onSelectPage: (page: string) => void;
  children: React.ReactNode;
}

export default function Layout({
  selectedPage,
  onSelectPage,
  children,
}: LayoutProps) {
  const [collapsed, setCollapsed] = useState(false);

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
          marginLeft: collapsed ? "72px" : "240px",
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
              Product Manager
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
