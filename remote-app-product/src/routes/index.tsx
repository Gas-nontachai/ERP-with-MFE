// src/routes/index.tsx
import Home from "../pages/Home";
import About from "../pages/About";
import Category from "../pages/Category";
import { Home as HomeIcon, Info, Contacts } from "@mui/icons-material";

// 👉 เมนูที่ใช้ร่วมกับ Sidebar
export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "About", icon: <Info />, path: "/about" },
  { text: "Category", icon: <Contacts />, path: "/category" },
];

// 👉 ฟังก์ชันใช้แสดงหน้าแบบไม่ใช้ react-router
export function renderPage(path: string) {
  switch (path) {
    case "/about":
      return <About />;
    case "/category":
      return <Category />;
    case "/":
    default:
      return <Home />;
  }
}
