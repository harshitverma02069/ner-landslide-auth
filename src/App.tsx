import "./auth/Auth.css";

import { useEffect, useState } from "react";
import Login from "./auth/Login";
import Signup from "./auth/Signup";
import Dashboard from "./dashboard/Dashboard";

type AuthView = "loading" | "login" | "signup" | "dashboard";

const API_URL = "http://localhost:8000";

export default function App() {
  const [view, setView] = useState<AuthView>("loading");

  useEffect(() => {
    const token = localStorage.getItem("ner_access_token");

    if (!token) {
      setView("login");
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then((response) => {
        if (!response.ok) {
          throw new Error("Invalid session");
        }

        return response.json();
      })
      .then(() => {
        setView("dashboard");
      })
      .catch(() => {
        localStorage.removeItem("ner_access_token");
        localStorage.removeItem("ner_user");
        setView("login");
      });
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("ner_access_token");
    localStorage.removeItem("ner_user");
    setView("login");
  };

  if (view === "loading") {
    return (
      <main className="dashboard">
        <div className="dashboard-card">
          <h1>Checking authentication...</h1>
        </div>
      </main>
    );
  }

  if (view === "dashboard") {
    return <Dashboard onLogout={handleLogout} />;
  }

  if (view === "signup") {
    return (
      <Signup
        onSwitchToLogin={() => setView("login")}
      />
    );
  }

  return (
    <Login
      onSwitchToSignup={() => setView("signup")}
      onLoginSuccess={() => setView("dashboard")}
    />
  );
}
