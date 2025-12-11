
import React from "react";
import ProtectedRoute from "../guards/ProtectedRoute";

export const protect = (Component: React.ComponentType, roles?: string[]) => {
  return () => (
    <ProtectedRoute roles={roles}>
      <Component />
    </ProtectedRoute>
  );
};
