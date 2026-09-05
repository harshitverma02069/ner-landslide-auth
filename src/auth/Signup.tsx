import { useState } from "react";
import type { FormEvent } from "react";
import { signup } from "./authApi";
import {
  ArrowRight,
  Check,
  Eye,
  EyeOff,
  LockKeyhole,
  Mail,
  ShieldCheck,
  User,
} from "lucide-react";

interface SignupProps {
  onSwitchToLogin: () => void;
}

export default function Signup({ onSwitchToLogin }: SignupProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [agree, setAgree] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError("");

    if (!name || !email || !password || !confirmPassword) {
      setError("Please complete all required fields.");
      return;
    }

    if (!email.includes("@")) {
      setError("Please enter a valid email address.");
      return;
    }

    if (password.length < 8) {
      setError("Password must contain at least 8 characters.");
      return;
    }

    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }

    if (!agree) {
      setError("Please accept the terms to continue.");
      return;
    }

    try {
      const result = await signup({
        full_name: name,
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

      console.log("Signup successful:", result.user);

      alert(`Account created successfully. Welcome, ${result.user.full_name}!`);
    } catch (error) {
      setError(
        error instanceof Error
          ? error.message
          : "Signup failed. Please try again.",
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
            Early warning.
            <br />
            Better response.
          </h1>

          <p className="brand-description">
            Join the platform that brings risk intelligence, weather signals,
            GIS monitoring and emergency reporting together.
          </p>

          <div className="feature-list">
            <div>
              <span>
                <Check size={15} />
              </span>
              Real-time risk monitoring
            </div>

            <div>
              <span>
                <Check size={15} />
              </span>
              AI-assisted prediction
            </div>

            <div>
              <span>
                <Check size={15} />
              </span>
              Emergency alerts
            </div>
          </div>
        </section>

        <section className="auth-card signup-card">
          <div className="auth-header">
            <div className="mobile-brand-icon">
              <ShieldCheck size={24} />
            </div>

            <p className="auth-eyebrow">GET STARTED</p>

            <h2>Create your account</h2>

            <p>
              Create an account to access the NER landslide monitoring
              platform.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="auth-form">
            <div className="form-field">
              <label htmlFor="signup-name">Full name</label>

              <div className="input-wrapper">
                <User size={18} />

                <input
                  id="signup-name"
                  type="text"
                  placeholder="Your full name"
                  value={name}
                  onChange={(event) => setName(event.target.value)}
                  autoComplete="name"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="signup-email">Email address</label>

              <div className="input-wrapper">
                <Mail size={18} />

                <input
                  id="signup-email"
                  type="email"
                  placeholder="you@example.com"
                  value={email}
                  onChange={(event) => setEmail(event.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="signup-password">Password</label>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="signup-password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Minimum 8 characters"
                  value={password}
                  onChange={(event) => setPassword(event.target.value)}
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <div className="form-field">
              <label htmlFor="signup-confirm-password">
                Confirm password
              </label>

              <div className="input-wrapper">
                <LockKeyhole size={18} />

                <input
                  id="signup-confirm-password"
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Re-enter your password"
                  value={confirmPassword}
                  onChange={(event) =>
                    setConfirmPassword(event.target.value)
                  }
                  autoComplete="new-password"
                />

                <button
                  type="button"
                  className="password-toggle"
                  onClick={() =>
                    setShowConfirmPassword(!showConfirmPassword)
                  }
                >
                  {showConfirmPassword ? (
                    <EyeOff size={18} />
                  ) : (
                    <Eye size={18} />
                  )}
                </button>
              </div>
            </div>

            <label className="terms-row">
              <input
                type="checkbox"
                checked={agree}
                onChange={(event) => setAgree(event.target.checked)}
              />

              <span>
                I agree to the platform's terms and privacy policy.
              </span>
            </label>

            {error && <div className="auth-error">{error}</div>}

            <button type="submit" className="auth-submit">
              Create account
              <ArrowRight size={18} />
            </button>
          </form>

          <div className="auth-divider">
            <span>SECURE ACCESS</span>
          </div>

          <p className="switch-auth">
            Already have an account?{" "}
            <button type="button" onClick={onSwitchToLogin}>
              Sign in
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
