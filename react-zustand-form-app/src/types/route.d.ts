import { ReactNode } from "react";

export type RouteItem = {
  path: string;
  element: ReactNode;
  label?: string;
  showInMenu?: boolean;
  layout?: "main" | "auth";
  protected?: boolean;
};
