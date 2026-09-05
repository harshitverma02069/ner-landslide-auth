import { useState } from "react";
import type { FormEvent } from "react";
import { login } from "./authApi";
import {
  ArrowRight,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
} from "lucide-react";

interface LoginProps {
  onSwitchToSignup: () => void;
  onLoginSuccess: () => void;
}

export default function Login({
  onSwitchToSignup,
  onLoginSuccess,
}: LoginProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [remember, setRemember] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!email || !password) {
      setError("Please enter your email and password.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    try {
      const result = await login({
        email,
        password,
      });

      localStorage.setItem(
        "ner_access_token",
        result.access_token,
      );

      localStorage.setItem(
        "ner_user",
        JSON.stringify(result.user),
      );

      console.log("Login successful:", result.user);

      onLoginSuccess();
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Login failed. Please try again.",
      );
    }
  };

  return (
    <div className="auth-page">
      <div className="auth-background">
        <div className="auth-glow auth-glow-one" />
        <div className="auth-glow auth-glow-two" />
      </div>

      <div className="auth-container">
        <section className="auth-brand-panel">
          <div className="brand-badge">
            <ShieldCheck size={22} />
          </div>

          <p className="brand-kicker">NER LANDSLIDE MONITOR</p>

          <h1>
            Monitor.
            <br />
            Predict.
            <br />
            Protect.
          </h1>

          <p className="brand-description">
            AI-powered landslide risk monitoring and early warning for the
            North Eastern Region of India.
          </p>

          <div className="brand-status">
            <span className="status-dot" />
            <span>Real-time monitoring system</span>
          </div>
        </section>

        <section className="auth-card">
          <div className="auth-header">
            <div className="mobile-brand-icon">
              <ShieldCheck size={24} />
            </div>

            <p className="auth-eyebrow">WELCOME BACK</p>

            <h2>Sign in to your account</h2>

            <p>
              Access the monitoring dashboard and emergency intelligence
              platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="login-email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="login-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field">
              <div className="field-label-row">
                <label htmlFor="login-password">Password</label>

                <button
                  type="button"
                  className="forgot-button"
                  onClick={() => setError("Password recovery will be connected to the backend.")}
                >
                  Forgot password?
                </button>
              </div>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="login-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="current-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                  aria-label={
                    showPassword ? "Hide password" : "Show password"
                  }
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <label className="remember-row">
              <input
                type="checkbox"
                checked={remember}
                onChange={(event) => setRemember(event.target.checked)}
              />
              <span>Remember me</span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-submit">
              Sign in
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>SECURE ACCESS</span>
          </div>

          <p className="switch-auth">
            Don't have an account?{" "}
            <button type="button" onClick={onSwitchToSignup}>
              Create account
            </button>
          </p>

          <p className="security-note">
            <LockKeyhole size={14} />
            Your account credentials are securely protected.
          </p>
        </section>
      </div>
    </div>
  );
}
