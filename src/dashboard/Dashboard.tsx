import { useEffect, useState } from "react";
import "./Dashboard.css";

interface User {
  id: number;
  full_name: string;
  email: string;
}

const API_URL = "http://localhost:8000";

interface DashboardProps {
  onLogout: () => void;
}

export default function Dashboard({
  onLogout,
}: DashboardProps) {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem(
      "ner_access_token",
    );

    if (!token) {
      onLogout();
      return;
    }

    fetch(`${API_URL}/api/auth/me`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    })
      .then(async (response) => {
        if (!response.ok) {
          throw new Error("Unauthorized");
        }

        return response.json();
      })
      .then((data) => {
        setUser(data);
      })
      .catch(() => {
        localStorage.removeItem(
          "ner_access_token",
        );

        localStorage.removeItem("ner_user");

        onLogout();
      })
      .finally(() => {
        setLoading(false);
      });
  }, [onLogout]);

  if (loading) {
    return (
      <main className="dashboard">
        <div className="dashboard-card">
          <h1>Loading...</h1>
        </div>
      </main>
    );
  }

  return (
    <main className="dashboard">
      <div className="dashboard-card">
        <div>
          <p className="dashboard-label">
            NER LANDSLIDE MONITOR
          </p>

          <h1>
            Welcome, {user?.full_name}
          </h1>

          <p className="dashboard-email">
            {user?.email}
          </p>

          <div className="auth-status">
            ✓ Authentication successful
          </div>
        </div>

        <button
          className="logout-button"
          onClick={onLogout}
        >
          Logout
        </button>
      </div>
    </main>
  );
}
