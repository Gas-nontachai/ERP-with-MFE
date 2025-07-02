// src/pages/Profile.tsx
import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Mail, CalendarDays, BadgeInfo } from "lucide-react";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <span className="loading loading-spinner loading-lg text-primary" />
      </div>
    );
  }

  return (
    <div className="max-w-md mx-auto mt-10 p-6 bg-base-100 shadow-md rounded-xl space-y-4">
      <div className="flex items-center gap-4">
        <div className="avatar placeholder">
          <div className="bg-neutral-focus text-neutral-content rounded-full w-16 h-16 flex items-center justify-center text-2xl">
            {user.name?.charAt(0).toUpperCase()}
          </div>
        </div>
        <div>
          <h2 className="text-xl font-bold">{user.name}</h2>
          <p className="text-sm text-base-content/60">ID: {user.userId}</p>
        </div>
      </div>

      <div className="divider" />

      <div className="space-y-2">
        <div className="flex items-center gap-3">
          <Mail className="w-5 h-5 text-primary" />
          <span>{user.email}</span>
        </div>
        <div className="flex items-center gap-3">
          <BadgeInfo className="w-5 h-5 text-secondary" />
          <span>Role ID: {user.role.name}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-success" />
          <span>Created: {new Date(user.createdAt).toLocaleDateString()}</span>
        </div>
        <div className="flex items-center gap-3">
          <CalendarDays className="w-5 h-5 text-warning" />
          <span>Updated: {new Date(user.updatedAt).toLocaleDateString()}</span>
        </div>
      </div>
    </div>
  );
}
