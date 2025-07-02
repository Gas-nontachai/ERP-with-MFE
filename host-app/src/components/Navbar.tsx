import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileDropdown from "./ProfileDropdown";
import { navItems } from "../routes";

function CustomNavLink({
  to,
  label,
  className,
}: {
  to: string;
  label: string;
  className: string;
}) {
  return (
    <NavLink
      to={to}
      className={({ isActive }) =>
        [className, isActive && "btn-active"].filter(Boolean).join(" ")
      }
    >
      {label}
    </NavLink>
  );
}

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
        {/* สมมติว่าจะเอา navItems ตัวแรกที่ showInNav เป็น true แสดงไว้ซ้าย (เช่น logo) */}
        {navItems
          .filter((item) => item.showInNav)
          .map((item) => (
            <CustomNavLink key={item.to} {...item} />
          ))}
      </div>
      <div className="flex-none gap-2">
        <LanguageSwitcher />
        <ProfileDropdown />
      </div>
    </div>
  );
}
