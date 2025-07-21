// components/Sidebar.tsx
import React from "react";
import { menuItems } from "../routes";
import {
  Box,
  List,
  ListItemButton,
  ListItemIcon,
  Tooltip,
  Divider,
  IconButton,
} from "@mui/material";
import MenuIcon from "@mui/icons-material/Menu";

interface SidebarProps {
  collapsed: boolean;
  selectedPage: string;
  onSelectPage: (page: string) => void;
  onToggleCollapse: () => void;
}

export default function Sidebar({
  collapsed,
  selectedPage,
  onSelectPage,
  onToggleCollapse,
}: SidebarProps) {
  return (
    <Box
      sx={{
        height: "100vh",
        width: collapsed ? 72 : 240,
        bgcolor: "background.paper",
        borderRight: 1,
        borderColor: "divider",
        transition: "width 0.3s ease",
        overflowX: "hidden",
      }}
    >
      <Box
        sx={{
          p: 2,
          display: "flex",
          alignItems: "center",
          justifyContent: collapsed ? "center" : "space-between",
        }}
      >
        {!collapsed && <Box sx={{ fontWeight: "bold", pl: 1 }}>เมนู</Box>}
        <IconButton onClick={onToggleCollapse}>
          <MenuIcon />
        </IconButton>
      </Box>

      <Divider />

      <List>
        {menuItems.map((item) => {
          const isSelected = selectedPage === item.path;
          const itemButton = (
            <ListItemButton
              selected={isSelected}
              onClick={() => onSelectPage(item.path)}
              sx={{
                "&.Mui-selected": {
                  bgcolor: "primary.light",
                  color: "white",
                  "& .MuiListItemIcon-root": { color: "white" },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              {!collapsed && <h5>{item.text}</h5>}
            </ListItemButton>
          );

          return (
            <Box key={item.text}>
              {collapsed ? (
                <Tooltip title={item.text} placement="right">
                  {itemButton}
                </Tooltip>
              ) : (
                itemButton
              )}
            </Box>
          );
        })}
      </List>
    </Box>
  );
}
