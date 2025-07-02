import React from "react";
import { useForm } from "react-hook-form";
import { useTranslation } from "react-i18next";
import { useQuery } from "@tanstack/react-query";
import { create } from "zustand";

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
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-2">
            <input
              className="input input-bordered w-full"
              placeholder={t("form.name")}
              {...register("name", { required: true })}
            />
            <button className="btn btn-success w-full" type="submit">
              {t("form.submit")}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Home;
