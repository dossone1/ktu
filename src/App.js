import React from "react";
import { Route, Routes } from "react-router-dom";
import "./App.css";
import Dashboard from "./pages/Dashboard";
import Join from "./pages/Join";
import Landing from "./pages/Landing";
import Login from "./pages/Login";
import NotFound from "./pages/NotFound";
import { ProtectedRoute } from "./context/ProtectedRoute";
import ResetPassword from "./pages/ResetPassword";
import { RedirectRoute } from "./context/RedirectRoute";
import PedningDues from "./pages/PedningDues";

function App() {
  return (
    <Routes>
      <Route index element={<Landing />} />
      <Route
        path="join"
        element={
          <RedirectRoute>
            <Join />
          </RedirectRoute>
        }
      />
      <Route
        path="login"
        element={
          <RedirectRoute>
            <Login />
          </RedirectRoute>
        }
      />
      <Route
        path="resetpassword"
        element={
          <RedirectRoute>
            <ResetPassword />
          </RedirectRoute>
        }
      />
      <Route
        path="pendingdues"
        element={
          <RedirectRoute>
            <PedningDues />
          </RedirectRoute>
        }
      />
      <Route
        path="dashboard/*"
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        }
      />
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

export default App;
