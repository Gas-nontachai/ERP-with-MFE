// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "./routes";
import RouteWrapper from "../components/RouteWrapper";

export default function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route, index) => {
        return (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper layout={route.layout}>{route.element}</RouteWrapper>
            }
          />
        );
      })}
    </Routes>
  );
}
