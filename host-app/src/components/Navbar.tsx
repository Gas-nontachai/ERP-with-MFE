import { NavLink } from "react-router-dom";
import LanguageSwitcher from "./LanguageSwitcher";
import ProfileDropdown from "./ProfileDropdown";
import { navItems } from "../routes";
import PermissionWrapper from "../components/PermissionWrapper";

function CustomNavLink({
  to,
  label,
  className,
  permission,
}: {
  to: string;
  label: string;
  className: string;
  permission?: string;
}) {
  return (
    <PermissionWrapper permission={permission ?? ""} action={"view"}>
      <NavLink
        to={to}
        className={({ isActive }) =>
          [
            "relative inline-block px-2 py-1 text-gray-600 transition-all duration-200",
            "hover:text-blue-600",
            "after:content-[''] after:block after:h-[2px] after:transition-all after:duration-300 after:scale-x-0 after:bg-blue-500 after:origin-left",
            "hover:after:scale-x-100",
            isActive && "text-blue-600 after:scale-x-100",
            className,
          ]
            .filter(Boolean)
            .join(" ")
        }
      >
        {label}
      </NavLink>
    </PermissionWrapper>
  );
}

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow">
      <div className="flex-1">
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
