// src/routes/index.tsx
import Home from "../pages/Home";
import About from "../pages/About";
import Contact from "../pages/Contact";
import { Home as HomeIcon, Info, Contacts } from "@mui/icons-material";

// 👉 เมนูที่ใช้ร่วมกับ Sidebar
export const menuItems = [
  { text: "Home", icon: <HomeIcon />, path: "/" },
  { text: "About", icon: <Info />, path: "/about" },
  { text: "Contact", icon: <Contacts />, path: "/contact" },
];

// 👉 ฟังก์ชันใช้แสดงหน้าแบบไม่ใช้ react-router
export function renderPage(path: string) {
  switch (path) {
    case "/about":
      return <About />;
    case "/contact":
      return <Contact />;
    case "/":
    default:
      return <Home />;
  }
}
