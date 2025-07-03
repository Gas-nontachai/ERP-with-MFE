// src/components/ProfileDropdown.tsx
import { Link } from "react-router-dom";
import { User, LogOut, Settings, ChevronDown } from "lucide-react";
import { useLogout } from "../utils/logout";
import { useTranslation } from "react-i18next";

export default function ProfileDropdown() {
  const { t } = useTranslation();
  const logout = useLogout();

  return (
    <div className="dropdown dropdown-end">
      <label
        tabIndex={0}
        className="btn btn-ghost btn-sm normal-case gap-2 px-3"
      >
        <div className="avatar">
          <div className="w-8 h-8 rounded-full bg-gradient-to-br from-primary to-secondary text-primary-content flex items-center justify-center shadow-sm">
            <User className="w-4 h-4" />
          </div>
        </div>
        <ChevronDown className="w-4 h-4 opacity-60" />
      </label>

      <ul
        tabIndex={0}
        className="dropdown-content z-[1] menu p-2 shadow-lg bg-base-100 rounded-box w-56 border border-base-300/20"
      >
        {/* Profile Header */}
        <li className="menu-title px-4 py-2">
          <span className="text-base-content/70 text-xs font-medium">
            {t("dropdown.my_account")}
          </span>
        </li>

        {/* Profile Link */}
        <li>
          <Link
            to="/profile"
            className="flex items-center gap-3 px-4 py-3 hover:bg-primary/10 hover:text-primary transition-colors duration-200 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-primary/10 flex items-center justify-center">
              <User className="w-4 h-4 text-primary" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{t("dropdown.view_profile")}</span>
              <span className="text-xs text-base-content/60">
                {t("dropdown.manage_profile")}
              </span>
            </div>
          </Link>
        </li>

        {/* Settings Link */}
        <li>
          <Link
            to="/checkstore"
            className="flex items-center gap-3 px-4 py-3 hover:bg-base-200/50 transition-colors duration-200 rounded-lg"
          >
            <div className="w-8 h-8 rounded-lg bg-base-200 flex items-center justify-center">
              <Settings className="w-4 h-4 text-base-content/70" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{t("dropdown.check_store")}</span>
              <span className="text-xs text-base-content/60">
                {t("dropdown.view_store_data")}
              </span>
            </div>
          </Link>
        </li>

        {/* Divider */}
        <div className="divider my-1"></div>

        {/* Logout Button */}
        <li>
          <button
            onClick={logout}
            className="flex items-center gap-3 px-4 py-3 hover:bg-error/10 hover:text-error transition-colors duration-200 rounded-lg group"
          >
            <div className="w-8 h-8 rounded-lg bg-error/10 flex items-center justify-center group-hover:bg-error/20">
              <LogOut className="w-4 h-4 text-error" />
            </div>
            <div className="flex flex-col">
              <span className="font-medium">{t("dropdown.logout")}</span>
              <span className="text-xs text-base-content/60">
                {t("dropdown.logout_desc")}
              </span>
            </div>
          </button>
        </li>
      </ul>
    </div>
  );
}
