import React from "react";
import { useForm, Controller } from "react-hook-form";
import { useAuth } from "../api/auth";
import { LoginForm } from "../types";

export default function Login() {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<LoginForm>();

  const loginMutation = useAuth();

  const onSubmit = (data: LoginForm) => {
    loginMutation.mutate(data);
  };

  return (
    <div className="min-h-screen bg-base-200 flex items-center justify-center p-4">
      <div className="card w-full max-w-md shadow-xl bg-base-100">
        <div className="card-body">
          <h2 className="card-title justify-center text-3xl mb-6">Login</h2>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
            <div>
              <label className="label">
                <span className="label-text">Email</span>
              </label>
              <Controller
                name="email"
                control={control}
                rules={{ required: "Please input your email!" }}
                render={({ field }) => (
                  <input
                    type="email"
                    {...field}
                    placeholder="Email"
                    className={`input input-bordered w-full ${
                      errors.email ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.email && (
                <p className="text-error mt-1 text-sm">
                  {errors.email.message}
                </p>
              )}
            </div>

            <div>
              <label className="label">
                <span className="label-text">Password</span>
              </label>
              <Controller
                name="password"
                control={control}
                rules={{ required: "Please input your password!" }}
                render={({ field }) => (
                  <input
                    type="password"
                    {...field}
                    placeholder="Password"
                    className={`input input-bordered w-full ${
                      errors.password ? "input-error" : ""
                    }`}
                  />
                )}
              />
              {errors.password && (
                <p className="text-error mt-1 text-sm">
                  {errors.password.message}
                </p>
              )}
            </div>

            <button
              type="submit"
              className={`btn btn-primary w-full ${
                loginMutation.status === "pending" ? "loading" : ""
              }`}
            >
              Log in
            </button>
          </form>
        </div>
      </div>
    </div>
  );
}
