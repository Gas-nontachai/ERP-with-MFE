import React, { JSX } from "react";
import { useAuthStore } from "../stores/authStore";
import { UseLanguageStore } from "../stores/languageStore";

export default function ShowAllStoresPage(): JSX.Element {
  // เรียก hook แยกกันก่อน (ตามกฎ Hooks)
  const authState = useAuthStore((state) => state);
  const languageStore = UseLanguageStore((state) => state);

  // รวม states เป็น object เดียว
  const allStates: Record<string, unknown> = {
    auth: authState,
    language: languageStore,
  };

  return (
    <div className="container mx-auto p-6 max-w-6xl">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-4xl font-bold text-center mb-2">
          🏪 Store States Overview
        </h1>
        <p className="text-center text-base-content/70">
          ข้อมูลทั้งหมดจากทุก Zustand Store
        </p>
        <div className="divider"></div>
      </div>

      {/* Stats Cards */}
      <div className="stats shadow mb-8 w-full">
        <div className="stat">
          <div className="stat-figure text-primary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
              ></path>
            </svg>
          </div>
          <div className="stat-title">Total Stores</div>
          <div className="stat-value text-primary">
            {Object.keys(allStates).length}
          </div>
          <div className="stat-desc">Active Zustand stores</div>
        </div>

        <div className="stat">
          <div className="stat-figure text-secondary">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              className="inline-block w-8 h-8 stroke-current"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 100 4m0-4v2m0-6V4"
              ></path>
            </svg>
          </div>
          <div className="stat-title">State Properties</div>
          <div className="stat-value text-secondary">
            {Object.values(allStates).reduce<number>(
              (total, state) => total + Object.keys(state as object).length,
              0
            )}
          </div>
          <div className="stat-desc">Total properties across stores</div>
        </div>
      </div>

      {/* Store Cards */}
      <div className="grid gap-6 md:grid-cols-1 lg:grid-cols-2">
        {Object.entries(allStates).map(([key, state]) => (
          <div key={key} className="card bg-base-100 shadow-xl">
            <div className="card-body">
              {/* Card Header */}
              <div className="flex items-center justify-between mb-4">
                <h2 className="card-title text-2xl capitalize">
                  <div className="badge badge-primary badge-lg">{key}</div>
                  Store
                </h2>
                <div className="tooltip" data-tip="จำนวน properties">
                  <div className="badge badge-outline">
                    {Object.keys(state as object).length} props
                  </div>
                </div>
              </div>

              {/* JSON Display */}
              <div className="mockup-code bg-base-200 text-sm overflow-auto max-h-96">
                <pre className="px-4 py-2">
                  <code className="text-xs sm:text-sm text-gray-950">
                    {JSON.stringify(state, null, 2)}
                  </code>
                </pre>
              </div>

              {/* Card Actions */}
              <div className="card-actions justify-end mt-4">
                <button
                  className="btn btn-primary btn-sm"
                  onClick={() => {
                    navigator.clipboard.writeText(
                      JSON.stringify(state, null, 2)
                    );
                    // Optional: Add toast notification here
                  }}
                >
                  📋 Copy JSON
                </button>
                <button
                  className="btn btn-outline btn-sm"
                  onClick={() => console.log(`${key} Store:`, state)}
                >
                  🔍 Log to Console
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Footer */}
      <div className="mt-12 text-center">
        <div className="alert alert-info shadow-lg max-w-2xl mx-auto">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="stroke-current shrink-0 w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
            ></path>
          </svg>
          <div>
            <h3 className="font-bold">Debug Information</h3>
            <div className="text-xs">
              หน้านี้แสดงข้อมูล state ทั้งหมดจาก Zustand stores สำหรับการ debug
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
