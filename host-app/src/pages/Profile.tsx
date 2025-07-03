// src/pages/Profile.tsx
import React from "react";
import { useAuthStore } from "../stores/authStore";
import { Mail, CalendarDays, BadgeInfo, User, Shield } from "lucide-react";

export default function Profile() {
  const user = useAuthStore((state) => state.user);

  if (!user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-center">
          <span className="loading loading-spinner loading-lg text-primary mb-4" />
          <p className="text-base-content/70">กำลังโหลดข้อมูลผู้ใช้...</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-base-200 py-8 px-4">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold mb-2">👤 โปรไฟล์ของฉัน</h1>
          <p className="text-base-content/70">
            ข้อมูลส่วนตัวและการตั้งค่าบัญชี
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-3">
          {/* Profile Card */}
          <div className="lg:col-span-1">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body items-center text-center">
                {/* Avatar */}
                <div className="avatar placeholder mb-4">
                  <div className="bg-gradient-to-br from-primary to-secondary text-primary-content rounded-full w-24 h-24 flex items-center justify-center text-3xl font-bold shadow-lg">
                    {user.name?.charAt(0).toUpperCase()}
                  </div>
                </div>

                {/* Name & ID */}
                <h2 className="card-title text-2xl mb-1">{user.name}</h2>
                <div className="badge badge-outline mb-4">
                  ID: {user.userId}
                </div>

                {/* Role Badge */}
                <div className="flex items-center gap-2 mb-4">
                  <Shield className="w-4 h-4" />
                  <div className="badge badge-primary badge-lg">
                    {user.role?.name}
                  </div>
                </div>

                {/* Quick Stats */}
                <div className="stats shadow mt-6 w-full">
                  <div className="stat">
                    <div className="stat-figure text-primary">
                      <User className="w-8 h-8" />
                    </div>
                    <div className="stat-title text-xs">สถานะ</div>
                    <div className="stat-value text-primary text-lg">
                      Active
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Details Card */}
          <div className="lg:col-span-2">
            <div className="card bg-base-100 shadow-xl">
              <div className="card-body">
                <h3 className="card-title text-xl mb-6">
                  <BadgeInfo className="w-5 h-5" />
                  ข้อมูลส่วนตัว
                </h3>

                {/* Info Grid */}
                <div className="grid gap-4 md:grid-cols-2">
                  {/* Email */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <Mail className="w-4 h-4 text-primary" />
                        อีเมล
                      </span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2 bg-base-200">
                      <span className="text-base-content">{user.email}</span>
                    </div>
                  </div>

                  {/* User ID */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <BadgeInfo className="w-4 h-4 text-secondary" />
                        รหัสผู้ใช้
                      </span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2 bg-base-200">
                      <span className="text-base-content">{user.userId}</span>
                    </div>
                  </div>

                  {/* Role */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <Shield className="w-4 h-4 text-accent" />
                        บทบาท
                      </span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2 bg-base-200">
                      <span className="text-base-content">
                        {user.role?.name}
                      </span>
                    </div>
                  </div>

                  {/* Created Date */}
                  <div className="form-control">
                    <label className="label">
                      <span className="label-text font-semibold flex items-center gap-2">
                        <CalendarDays className="w-4 h-4 text-success" />
                        วันที่สร้าง
                      </span>
                    </label>
                    <div className="input input-bordered flex items-center gap-2 bg-base-200">
                      <span className="text-base-content">
                        {new Date(user.createdAt).toLocaleDateString("th-TH", {
                          year: "numeric",
                          month: "long",
                          day: "numeric",
                        })}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
