import { Outlet } from "react-router-dom";

export default function AuthLayout() {
  return (
    <div className="h-screen flex items-center justify-center  ">
      <div className="w-full max-w-md p-6 bg-base-100 shadow-lg rounded-xl">
        <Outlet />
      </div>
    </div>
  );
}
