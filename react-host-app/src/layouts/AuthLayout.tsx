// src/layouts/AuthLayout.tsx
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const AuthLayout = ({ children }: Props) => <main>{children}</main>;

export default AuthLayout;
