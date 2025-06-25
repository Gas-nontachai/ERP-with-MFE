// src/router/index.tsx
import { Routes, Route } from "react-router-dom";
import { routeConfig } from "./routes";
import RouteWrapper from "../components/RouteWrapper";
import ProtectedRoute from "../components/ProtectedRoute";

export default function AppRoutes() {
  return (
    <Routes>
      {routeConfig.map((route, index) => {
        const content = route.protected ? (
          <ProtectedRoute>{route.element}</ProtectedRoute>
        ) : (
          route.element
        );

        return (
          <Route
            key={index}
            path={route.path}
            element={
              <RouteWrapper layout={route.layout}>{content}</RouteWrapper>
            }
          />
        );
      })}
    </Routes>
  );
}
