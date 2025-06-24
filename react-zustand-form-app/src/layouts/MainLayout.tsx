// src/layouts/MainLayout.tsx
import Navbar from "../components/Navbar";
import { ReactNode } from "react";

type Props = {
  children: ReactNode;
};

const MainLayout = ({ children }: Props) => (
  <>
    <Navbar />
    <main>{children}</main>
  </>
);

export default MainLayout;
