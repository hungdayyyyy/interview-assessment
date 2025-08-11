import React from "react";
import { Routes, Route, BrowserRouter } from "react-router-dom";
import ROUTER from "./index";

// Lazy load components
const UserProfile = React.lazy(() => import("../components/UserProfiles"));
const Dashboard = React.lazy(() => import("../components/Dashboard"));
const NotFound = React.lazy(() => import("../components/NotFound"));

/**
 * Loading component wrapper
 */
function LazyLoadingComponent({ children }) {
  return (
    <React.Suspense
      fallback={
        <div
          className="loading-center"
          style={{
            height: "100vh",
            display: "flex",
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <div>Loading...</div>
        </div>
      }
    >
      {children}
    </React.Suspense>
  );
}

/**
 * Main application router
 */
const AppRouter = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path={ROUTER.HOME}
          element={
            <LazyLoadingComponent>
              <Dashboard />
            </LazyLoadingComponent>
          }
        />
        <Route
          path={ROUTER.USER_PROFILE}
          element={
            <LazyLoadingComponent>
              <UserProfile />
            </LazyLoadingComponent>
          }
        />
        <Route
          path="*"
          element={
            <LazyLoadingComponent>
              <NotFound />
            </LazyLoadingComponent>
          }
        />
      </Routes>
    </BrowserRouter>
  );
};

export default AppRouter;
