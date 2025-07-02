import React, { Suspense } from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";
const UserManageApp = React.lazy(() => import("user_manage/UserManageApp"));

type CounterState = {
  count: number;
  increment: () => void;
};
const useCounterStore = create<CounterState>((set) => ({
  count: 0,
  increment: () => set((state) => ({ count: state.count + 1 })),
}));

const fetchData = async () => {
  return new Promise<{ message: string }>((resolve) =>
    setTimeout(() => resolve({ message: "Hello from react-query!" }), 1000)
  );
};

type FormValues = {
  name: string;
};

const Home: React.FC = () => {
  const { t } = useTranslation();
  const { register, handleSubmit, reset } = useForm<FormValues>();
  const { data, isLoading } = useQuery({
    queryKey: ["fetchMessage"],
    queryFn: fetchData,
  });
  const { count, increment } = useCounterStore();

  const onSubmit = (data: FormValues) => {
    alert(`${t("form.greeting")}: ${data.name}`);
    reset();
  };

  return (
    <div className="min-h-screen bg-base-200 flex flex-col items-center justify-center p-4">
      <div className="card w-full max-w-md bg-base-100 shadow-xl">
        <div className="card-body">
          <h1 className="card-title text-2xl mb-2">{t("home.title")}</h1>
          <p className="mb-4">
            {isLoading ? t("home.loading", "Loading...") : data?.message}
          </p>
          <div className="mb-4">
            <button className="btn btn-primary" onClick={increment}>
              {t("home.increment", "Increment")}: {count}
            </button>
          </div>
          <div className="p-4">
            <h1 className="text-2xl font-bold mb-4">User Management</h1>
            <Suspense fallback={<div>Loading...</div>}>
              <h1>Load done </h1>
              <UserManageApp />
            </Suspense>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
